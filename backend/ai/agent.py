import os 
import yaml 
from crewai import Agent ,Task ,Crew ,Process 
from langchain_groq import ChatGroq 

def load_knowledge_base ():
    base_dir =os .path .dirname (os .path .dirname (__file__ ))
    try :
        with open (os .path .join (base_dir ,'data','projects.yaml'),'r')as f :
            projects =yaml .safe_load (f )
    except :
        projects ={}
    return f"Projects Context: {projects }"

def process_chat_query (query :str ):

    groq_api_key =os .environ .get ("GROQ_API_KEY")
    if not groq_api_key :
        return "System Notice: GROQ_API_KEY is not configured. AI Assistant is currently offline."

    llm =ChatGroq (temperature =0.2 ,groq_api_key =groq_api_key ,model_name ="mixtral-8x7b-32768")
    kb_context =load_knowledge_base ()


    retriever_agent =Agent (
    role ="Information Retriever",
    goal ="Extract the most relevant facts from Keshav's portfolio data based on the user's query.",
    backstory ="You have full access to Keshav's knowledge base, projects, and resume data.",
    verbose =True ,
    allow_delegation =False ,
    llm =llm 
    )


    resume_agent =Agent (
    role ="Resume Analyzer",
    goal ="Determine how Keshav's skills and experience match the user's query.",
    backstory ="You are an expert at analyzing Keshav's background to present him as the ideal candidate.",
    verbose =True ,
    allow_delegation =False ,
    llm =llm 
    )


    project_agent =Agent (
    role ="Project Specialist",
    goal ="Identify the specific projects that best answer the user's query.",
    backstory ="You know the intimate engineering details of all of Keshav's projects.",
    verbose =True ,
    allow_delegation =False ,
    llm =llm 
    )


    response_agent =Agent (
    role ="Communications Director",
    goal ="Draft a highly professional, concise response to the user based on the facts provided by the other agents.",
    backstory ="You represent Keshav Mishra. You are polished, direct, and focused on demonstrating engineering excellence.",
    verbose =True ,
    allow_delegation =False ,
    llm =llm 
    )


    retrieve_task =Task (
    description =f"Analyze this query: '{query }'. Extract relevant information from this context: {kb_context }",
    expected_output ="A summary of the relevant facts extracted from the context.",
    agent =retriever_agent 
    )

    analyze_task =Task (
    description ="Review the retrieved facts and identify the most relevant skills and projects.",
    expected_output ="A prioritized list of skills and projects to highlight.",
    agent =resume_agent 
    )

    draft_task =Task (
    description ="Draft a final, professional response to the user's query.",
    expected_output ="A polished response ready to be sent to the user.",
    agent =response_agent 
    )

    crew =Crew (
    agents =[retriever_agent ,resume_agent ,project_agent ,response_agent ],
    tasks =[retrieve_task ,analyze_task ,draft_task ],
    process =Process .sequential 
    )

    try :
        result =crew .kickoff ()
        return str (result )
    except Exception as e :
        return f"Sorry, I encountered an error while processing your request: {e }"
