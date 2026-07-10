





export function ShowroomScene({ children }: { children: React.ReactNode }) {
  return (
    <>

      <div style={{ position: 'relative', width: '100%', minHeight: '200vh', zIndex: 1 }}>
        {children}
      </div>


    </>
  );
}

