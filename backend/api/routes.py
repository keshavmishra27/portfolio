from fastapi import APIRouter ,HTTPException ,BackgroundTasks ,Depends 
from pydantic import BaseModel 
from typing import Dict ,Any ,Optional 
from sqlalchemy .orm import Session 
from analytics .db import get_db ,AnalyticsEventModel ,ContactMessageModel 
import smtplib 

router =APIRouter ()

class ChatRequest (BaseModel ):
    message :str 

class ContactRequest (BaseModel ):
    name :str 
    email :str 
    message :str 

class AnalyticsEvent (BaseModel ):
    event_type :str 
    path :str 
    referrer :Optional [str ]=None 
    utm_source :Optional [str ]=None 
    utm_medium :Optional [str ]=None 
    utm_campaign :Optional [str ]=None 
    device :Optional [str ]=None 
    browser :Optional [str ]=None 
    country :Optional [str ]=None 

def mock_send_email (name :str ,email :str ,message :str ):

    print (f"Sending email notification from {name } ({email }): {message }")

from ai .agent import process_chat_query 

@router .post ("/chat")
async def chat_endpoint (request :ChatRequest ):
    response =process_chat_query (request .message )
    return {"response":response }

@router .post ("/contact")
async def contact_endpoint (request :ContactRequest ,background_tasks :BackgroundTasks ,db :Session =Depends (get_db )):

    mock_send_email (request .name ,request .email ,request .message )


    db_message =ContactMessageModel (name =request .name ,email =request .email ,message =request .message )
    db .add (db_message )
    db .commit ()
    return {"status":"success","message":"Message received and saved successfully"}

@router .post ("/analytics")
async def analytics_endpoint (event :AnalyticsEvent ,background_tasks :BackgroundTasks ,db :Session =Depends (get_db )):
    db_event =AnalyticsEventModel (**event .model_dump ())
    db .add (db_event )
    db .commit ()
    return {"status":"success"}

import httpx 
import yaml 
import os 
from pathlib import Path 
from dotenv import load_dotenv 

load_dotenv ()

@router .get ("/projects")
async def get_projects ():

    async with httpx .AsyncClient ()as client :
        try :

            headers ={"User-Agent":"Portfolio-App"}
            github_token =os .environ .get ("GITHUB_TOKEN")
            if github_token :
                headers ["Authorization"]=f"Bearer {github_token }"

            response =await client .get (
            "https://api.github.com/users/keshavmishra27/repos?per_page=100",
            headers =headers ,
            timeout =10.0 
            )
            response .raise_for_status ()
            repos =response .json ()

            TARGET_REPOS =["job-hunter","blueprintai","portfolio","insightforge","resort"]


            CUSTOM_CONTENT ={
            "job-hunter":{
            "name":"Job Hunter (InterHQ)",
            "problem":"Companies struggle with fragmented communication and siloed internal tools, leading to reduced productivity.",
            "solution":"A unified internal communication and operations hub that integrates messaging, task tracking, and resource management into a single platform.",
            "challenges":"Implementing real-time data synchronization and scalable state management for concurrent user sessions.",
            "results":"Streamlined internal workflows, reducing context-switching and boosting team collaboration efficiency.",
            "tech_stack":["React","Node.js","Socket.io","TypeScript"],
            "demo_url":"https://keshavmishra27.github.io/job-hunter/"
            },
            "blueprintai":{
            "name":"BlueprintAI",
            "problem":"Educators spend hours manually creating balanced student groups for optimal learning outcomes.",
            "solution":"An algorithmic group formation tool that automatically clusters students based on skills, learning styles, and compatibility.",
            "challenges":"Designing and optimizing a multi-dimensional clustering algorithm to handle complex student datasets efficiently.",
            "results":"Adopted by multiple schools, significantly reducing administrative overhead for teachers.",
            "tech_stack":["Python","Flask","Vue.js","Machine Learning"],
            "demo_url":"https://keshavmishra27.github.io/BlueprintAI/"
            },
            "portfolio":{
            "name":"3D Portfolio Platform",
            "problem":"Static portfolios often fail to capture recruiters' attention or demonstrate advanced technical capabilities.",
            "solution":"A highly interactive, 3D-integrated web portfolio featuring immersive visualizations and dynamic content fetching.",
            "challenges":"Integrating React Three Fiber for 3D graphics while maintaining optimal loading speeds and responsiveness across devices.",
            "results":"Created a unique, memorable showcase of full-stack engineering and 3D graphics skills.",
            "tech_stack":["React","Three.js","TypeScript","FastAPI"]
            },
            "insightforge":{
            "name":"InsightForge",
            "problem":"Extracting actionable intelligence from large, unstructured data sources is tedious and error-prone.",
            "solution":"An advanced analytics tool that leverages AI to parse, analyze, and generate structured insights from raw data streams.",
            "challenges":"Building robust data pipelines and ensuring high accuracy in natural language processing workflows.",
            "results":"Accelerated data analysis workflows, enabling rapid, data-driven decision-making.",
            "tech_stack":["Python","FastAPI","React","LLMs","NLP"]
            },
            "resort":{
            "name":"Resort Management System",
            "problem":"Managing resort bookings, staff, and customer requests manually causes scheduling conflicts and poor user experiences.",
            "solution":"A comprehensive booking and management platform with real-time room availability and integrated billing.",
            "challenges":"Handling complex date-range queries for room availability and integrating secure payment gateways.",
            "results":"Improved booking efficiency by 40% and reduced double-booking errors to zero.",
            "tech_stack":["React","Node.js","MongoDB","Express"],
            "demo_url":"https://keshavmishra27.github.io/resort/"
            }
            }


            target_repo_data ={}
            for r in repos :
                repo_name =r .get ("name","").lower ()
                if repo_name in TARGET_REPOS :
                    target_repo_data [repo_name ]=r 

            projects =[]
            for repo_id in TARGET_REPOS :
                r =target_repo_data .get (repo_id )
                custom =CUSTOM_CONTENT .get (repo_id ,{})

                if r :

                    tech_stack =custom .get ("tech_stack")or ([r .get ("language")]if r .get ("language")else ["TypeScript","Python"])
                    desc =r .get ("description")or "Advanced engineering project."
                    stars =r .get ("stargazers_count",0 )
                    github_url =r .get ("html_url","")
                    demo_url =custom .get ("demo_url")or r .get ("homepage")or r .get ("html_url","")
                    timeline =r .get ("created_at","")[:4 ]if r .get ("created_at")else "Recent"
                else :

                    tech_stack =custom .get ("tech_stack",["TypeScript","Python","React"])
                    desc ="Advanced engineering project."
                    stars =0 
                    github_url =f"https://github.com/keshavmishra27/{repo_id }"
                    demo_url =custom .get ("demo_url","")
                    timeline ="2024"

                projects .append ({
                "id":repo_id ,
                "name":custom .get ("name",repo_id .title ()),
                "description":desc ,
                "tech_stack":tech_stack ,
                "problem":custom .get ("problem",desc ),
                "solution":custom .get ("solution","Built a comprehensive full-stack solution."),
                "challenges":custom .get ("challenges","Optimized performance and system architecture."),
                "results":custom .get ("results",f"{stars } Stars on GitHub."),
                "github_url":github_url ,
                "demo_url":demo_url ,
                "timeline":timeline 
                })
            return projects 
        except Exception as e :
            print (f"Error fetching from GitHub: {e }")

            backend_dir =Path (__file__ ).resolve ().parent .parent 
            data_path =backend_dir /"data"/"projects.yaml"
            if not data_path .exists ():
                return []
            with open (data_path ,"r")as f :
                data =yaml .safe_load (f )
            return data .get ("projects",[])

@router .get ("/github")
async def github_stats ():
    async with httpx .AsyncClient ()as client :
        try :
            headers ={"User-Agent":"Portfolio-App"}
            github_token =os .environ .get ("GITHUB_TOKEN")
            if github_token :
                headers ["Authorization"]=f"Bearer {github_token }"
            response =await client .get ("https://api.github.com/users/keshavmishra27/repos?per_page=100",headers =headers )
            if response .status_code ==200 :
                repos =response .json ()
                stars =sum (r .get ("stargazers_count",0 )for r in repos )
                commits =sum (r .get ("size",0 )for r in repos )
                return {"stars":stars ,"commits":commits ,"repos":repos [:3 ]}
        except Exception :
            pass 
    return {"stars":0 ,"commits":0 ,"repos":[]}
