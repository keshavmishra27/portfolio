from sqlalchemy import create_engine ,Column ,Integer ,String ,DateTime 
from sqlalchemy .orm import declarative_base 
from sqlalchemy .orm import sessionmaker 
import datetime 

SQLALCHEMY_DATABASE_URL ="sqlite:///./portfolio.db"

engine =create_engine (
SQLALCHEMY_DATABASE_URL ,connect_args ={"check_same_thread":False }
)
SessionLocal =sessionmaker (autocommit =False ,autoflush =False ,bind =engine )

Base =declarative_base ()

class AnalyticsEventModel (Base ):
    __tablename__ ="analytics_events"

    id =Column (Integer ,primary_key =True ,index =True )
    timestamp =Column (DateTime ,default =datetime .datetime .utcnow )
    event_type =Column (String ,index =True )
    path =Column (String ,index =True )
    referrer =Column (String ,nullable =True )
    utm_source =Column (String ,nullable =True )
    utm_medium =Column (String ,nullable =True )
    utm_campaign =Column (String ,nullable =True )
    device =Column (String ,nullable =True )
    browser =Column (String ,nullable =True )
    country =Column (String ,nullable =True )

class ContactMessageModel (Base ):
    __tablename__ ="contact_messages"

    id =Column (Integer ,primary_key =True ,index =True )
    timestamp =Column (DateTime ,default =datetime .datetime .utcnow )
    name =Column (String )
    email =Column (String )
    message =Column (String )


Base .metadata .create_all (bind =engine )

def get_db ():
    db =SessionLocal ()
    try :
        yield db 
    finally :
        db .close ()
