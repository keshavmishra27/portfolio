

export interface SkillProject {
  name: string;
  how_used: string;
}

export interface Skill {
  skill: string;
  experience: string;
  used_in: SkillProject[];
}



export function SkillShowcaseScene({ 
  modelPath: _modelPath, 
  scale: _scale = 2.5, 
  positionY: _positionY = 0,
  positionX: _positionX = 0,
  rotation: _rotation = [0, 0, 0]
}: { 
  modelPath: string, 
  scale?: number, 
  positionY?: number,
  positionX?: number,
  rotation?: [number, number, number]
}) {
  return (
    <div style={{ width: '100%', height: '100%', minHeight: '400px' }}>
    </div>
  );
}
