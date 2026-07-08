import os 
import sys 
import json 
import requests 
from dotenv import load_dotenv 


env_path =os .path .join (os .path .dirname (os .path .dirname (__file__ )),'.env')
load_dotenv (env_path )

GITHUB_TOKEN =os .environ .get ('GITHUB_TOKEN')
GROQ_API_KEY =os .environ .get ('GROQ_API_KEY')

if not GITHUB_TOKEN or not GROQ_API_KEY :
    print ("Error: GITHUB_TOKEN and GROQ_API_KEY must be set in backend/.env")
    sys .exit (1 )

def fetch_github_data ():
    headers ={'Authorization':f'token {GITHUB_TOKEN }'}

    user_res =requests .get ('https://api.github.com/user',headers =headers )
    user_res .raise_for_status ()
    username =user_res .json ().get ('login')
    print (f"Fetching repos for {username }...")


    repos_res =requests .get (f'https://api.github.com/user/repos?per_page=100&type=owner',headers =headers )
    repos_res .raise_for_status ()
    repos =repos_res .json ()

    repo_data =[]
    for repo in repos :
        if repo ['fork']:
            continue 

        lang_res =requests .get (repo ['languages_url'],headers =headers )
        languages =list (lang_res .json ().keys ())if lang_res .status_code ==200 else []

        repo_data .append ({
        'name':repo ['name'],
        'description':repo ['description']or "",
        'languages':languages ,
        'topics':repo ['topics']
        })
    return repo_data 

def generate_skills_with_groq (repo_data ):
    print ("Analyzing data with Groq...")
    prompt =f"""
    Analyze the following GitHub repository data for a software engineer.
    Extract a comprehensive list of their technical skills based on the languages and descriptions.
    For each skill, estimate their experience level (e.g. Beginner, Intermediate, Advanced, Expert) based on the number of projects it appears in.
    Also, cite a few specific repositories where they have used this skill.
    
    Repository Data:
    {json .dumps (repo_data ,indent =2 )}
    
    Output the result EXACTLY as a valid JSON array of objects, with NO markdown formatting, NO backticks, and NO conversational text.
    Use this exact schema:
    [
      {{
        "skill": "React",
        "experience": "Advanced",
        "used_in": ["portfolio", "dashboard-app"]
      }}
    ]
    """

    headers ={
    'Authorization':f'Bearer {GROQ_API_KEY }',
    'Content-Type':'application/json'
    }

    payload ={
    "model":"llama-3.1-8b-instant",
    "messages":[
    {
    "role":"user",
    "content":prompt 
    }
    ],
    "temperature":0.1 
    }

    res =requests .post ('https://api.groq.com/openai/v1/chat/completions',headers =headers ,json =payload )
    if not res .ok :
        print (f"Groq API Error: {res .text }")
        res .raise_for_status ()

    content =res .json ()['choices'][0 ]['message']['content']


    content =content .strip ()
    if content .startswith ("```json"):
        content =content [7 :]
    if content .startswith ("```"):
        content =content [3 :]
    if content .endswith ("```"):
        content =content [:-3 ]

    return json .loads (content .strip ())

def main ():
    try :
        repo_data =fetch_github_data ()
        skills =generate_skills_with_groq (repo_data )


        frontend_dir =os .path .join (os .path .dirname (os .path .dirname (os .path .dirname (__file__ ))),'frontend','src','data')
        os .makedirs (frontend_dir ,exist_ok =True )

        output_path =os .path .join (frontend_dir ,'skills.json')
        with open (output_path ,'w')as f :
            json .dump (skills ,f ,indent =2 )

        print (f"Successfully generated {len (skills )} skills and saved to {output_path }")
    except Exception as e :
        print (f"Error occurred: {e }")
        sys .exit (1 )

if __name__ =='__main__':
    main ()
