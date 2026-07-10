import json
import os

# Define the mapping of skills to subdomains
mapping = {
    "Python": ("AI", "Machine Learning"),
    "JavaScript": ("Full-Stack", "Frontend"),
    "TypeScript": ("Full-Stack", "Frontend"),
    "CSS": ("Full-Stack", "Frontend"),
    "HTML": ("Full-Stack", "Frontend"),
    "TensorFlow": ("AI", "Deep Learning"),
    "Keras": ("AI", "Deep Learning"),
    "Pandas": ("AI", "Machine Learning"),
    "Seaborn": ("AI", "Machine Learning"),
    "Matplotlib": ("AI", "Machine Learning"),
    "Scikit-learn": ("AI", "Machine Learning"),
    "XGBoost": ("AI", "Machine Learning"),
    "GridSearchCV": ("AI", "Machine Learning"),
    "NumPy": ("AI", "Machine Learning"),
    "OLS": ("AI", "Machine Learning"),
    "Ridge": ("AI", "Machine Learning"),
    "Logistic": ("AI", "Machine Learning"),
    "KNN": ("AI", "Machine Learning"),
    "Mako": ("Full-Stack", "Backend"),
    "MDX": ("Full-Stack", "Frontend")
}

new_skills = [
    {
        "skill": "LangChain & CrewAI",
        "experience": "Intermediate",
        "used_in": [
            {"name": "BlueprintAI", "how_used": "Used for orchestrating multi-agent systems and connecting LLMs to tools."}
        ]
    },
    {
        "skill": "Large Language Models",
        "experience": "Advanced",
        "used_in": [
            {"name": "BlueprintAI", "how_used": "Integrated OpenAI, Google GenAI, and Ollama for generative tasks."},
            {"name": "job-hunter", "how_used": "Used for parsing job descriptions and matching."}
        ]
    },
    {
        "skill": "RAG & Sentence Transformers",
        "experience": "Advanced",
        "used_in": [
            {"name": "job-hunter", "how_used": "Used for retrieving and comparing documents."}
        ]
    },
    {
        "skill": "Vector Databases (FAISS)",
        "experience": "Intermediate",
        "used_in": [
            {"name": "job-hunter", "how_used": "Used FAISS for efficient similarity search of embeddings."}
        ]
    },
    {
        "skill": "Scraping Agents",
        "experience": "Advanced",
        "used_in": [
            {"name": "job-hunter", "how_used": "Used Playwright and Apify for intelligent, agentic web scraping."}
        ]
    },
    {
        "skill": "PyTorch",
        "experience": "Advanced",
        "used_in": [
            {"name": "stock_agent", "how_used": "Used PyTorch to define, train, and optimize deep neural networks."}
        ]
    },
    {
        "skill": "Deep Q-Networks (DQN)",
        "experience": "Advanced",
        "used_in": [
            {"name": "stock_agent", "how_used": "Implemented Dueling DQN with multi-step targets for stock trading."}
        ]
    },
    {
        "skill": "Custom RL Environments",
        "experience": "Advanced",
        "used_in": [
            {"name": "stock_agent", "how_used": "Built a custom trading environment handling historical data and actions."}
        ]
    },
    {
        "skill": "Replay Buffers",
        "experience": "Advanced",
        "used_in": [
            {"name": "stock_agent", "how_used": "Implemented n-step replay buffers for off-policy training stability."}
        ]
    }
]

new_mapping = {
    "LangChain & CrewAI": ("AI", "Agentic AI"),
    "Large Language Models": ("AI", "Agentic AI"),
    "RAG & Sentence Transformers": ("AI", "Agentic AI"),
    "Vector Databases (FAISS)": ("AI", "Agentic AI"),
    "Scraping Agents": ("AI", "Agentic AI"),
    "PyTorch": ("AI", "Reinforcement Learning"),
    "Deep Q-Networks (DQN)": ("AI", "Reinforcement Learning"),
    "Custom RL Environments": ("AI", "Reinforcement Learning"),
    "Replay Buffers": ("AI", "Reinforcement Learning")
}

hierarchy = {
    "AI": {
        "Agentic AI": [],
        "Machine Learning": [],
        "Deep Learning": [],
        "Reinforcement Learning": []
    },
    "Full-Stack": {
        "Frontend": [],
        "Backend": []
    }
}

with open(r'd:\kfiles\portfolio\frontend\src\data\skills.json', 'r', encoding='utf-8') as f:
    old_skills = json.load(f)

for skill_obj in old_skills:
    s_name = skill_obj['skill']
    if s_name in mapping:
        dom, subdom = mapping[s_name]
        hierarchy[dom][subdom].append(skill_obj)

for skill_obj in new_skills:
    s_name = skill_obj['skill']
    dom, subdom = new_mapping[s_name]
    hierarchy[dom][subdom].append(skill_obj)

# Convert hierarchy dictionary to list format
final_data = []
for dom, subdomains in hierarchy.items():
    sub_list = []
    for subdom, skills in subdomains.items():
        if len(skills) > 0:
            sub_list.append({
                "name": subdom,
                "skills": skills
            })
    final_data.append({
        "domain": dom,
        "subdomains": sub_list
    })

with open(r'd:\kfiles\portfolio\frontend\src\data\skills_hierarchy.json', 'w', encoding='utf-8') as f:
    json.dump(final_data, f, indent=2)

print("Generated skills_hierarchy.json")
