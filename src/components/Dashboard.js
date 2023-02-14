import DisplayFeeds from "./displayFeeds";
import DisplayPigs from "./displayPigs";
import DisplayMedicines from "./displayMedicines";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import './Dashboard.css';
import Card from 'react-bootstrap/Card';


const Dashboard =() => {
    return (
        
           <div style={{display: 'flex', paddingTop: '50px'}}>
            <Card style={{ width: '32rem', display: 'flex', flexDirection: 'row',  paddingBottom: '50px',
          paddingLeft: '50px', paddingRight: '50px' }}>
      <Card.Body>
        <Card.Title>PIGS</Card.Title>
        
        <Card.Text>
        <div style={{fontSize: '3rem'}}>100</div>
        </Card.Text>
       
        
      </Card.Body>
      </Card>
      <Card style={{ width: '32rem', display: 'flex', flexDirection: 'row', paddingBottom: '50px',
          paddingLeft: '50px', paddingRight: '50px'}}>
      <Card.Body>
        <Card.Title>FEEDS</Card.Title>
        
        <Card.Text>
        <div style={{fontSize: '3rem'}}>100</div>
        </Card.Text>
        
      </Card.Body>
      </Card>
      <Card style={{ width: '32rem', display: 'flex', flexDirection: 'row', paddingBottom: '50px',
          paddingLeft: '50px', paddingRight: '50px' }}>
      <Card.Body>
        <Card.Title>MEDICINES</Card.Title>
        
        <Card.Text>
        <div style={{fontSize: '3rem'}}>100</div>
        </Card.Text>
        
      </Card.Body>
      </Card>
    </div>


    
          
    
    )
} 

export default Dashboard;