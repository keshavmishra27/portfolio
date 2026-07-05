import json
import os

data_path = r"d:\kfiles\portfolio\frontend\src\data\skills.json"

with open(data_path, "r") as f:
    skills = json.load(f)

for skill_entry in skills:
    skill = skill_entry["skill"]
    used_in = skill_entry["used_in"]
    new_used_in = []
    
    for repo in used_in:
        # If it's already a dict, skip (in case script runs twice)
        if isinstance(repo, dict):
            new_used_in.append(repo)
            continue
            
        repo_lower = repo.lower()
        desc = f"Applied {skill} in {repo} to implement core features, optimize performance, and deliver robust functionality."
        
        # Simple heuristics to make it sound professional
        if skill == "Python":
            if "classifier" in repo_lower or "predictor" in repo_lower or "model" in repo_lower:
                desc = f"Used Python for data processing, model training, and building the core inference logic in {repo}."
            elif "automation" in repo_lower or "tracker" in repo_lower or "scrapper" in repo_lower:
                desc = f"Leveraged Python's scripting capabilities to automate workflows, scrape data, and build efficient pipelines in {repo}."
            elif "api" in repo_lower or "backend" in repo_lower or "system" in repo_lower:
                desc = f"Developed the backend architecture and API endpoints using Python in {repo}."
        elif skill in ["JavaScript", "TypeScript"]:
            desc = f"Utilized {skill} to build interactive UI components, manage application state, and integrate with backend APIs in {repo}."
        elif skill in ["HTML", "CSS"]:
            desc = f"Designed and implemented responsive, accessible, and visually appealing user interfaces using {skill} in {repo}."
        elif skill in ["TensorFlow", "Keras", "Scikit-learn", "XGBoost"]:
            desc = f"Employed {skill} to design, train, and evaluate machine learning models for predictive accuracy in {repo}."
        elif skill in ["Pandas", "NumPy"]:
            desc = f"Utilized {skill} for data cleaning, transformation, and complex numerical analysis in {repo}."
        elif skill in ["Seaborn", "Matplotlib"]:
            desc = f"Created insightful data visualizations and analytical plots using {skill} to communicate findings in {repo}."
        
        new_used_in.append({
            "name": repo,
            "how_used": desc
        })
    
    skill_entry["used_in"] = new_used_in

with open(data_path, "w", encoding="utf-8") as f:
    json.dump(skills, f, indent=2)

print("Successfully updated skills.json with how_used descriptions.")
