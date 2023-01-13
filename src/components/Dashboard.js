import DisplayFeeds from "./displayFeeds";
import DisplayPigs from "./displayPigs";
import DisplayMedicines from "./displayMedicines";
import './Dashboard.css';


const Dashboard =() => {
    return (
        <div className="Dashboard-container">
            <DisplayPigs></DisplayPigs>
            <DisplayMedicines></DisplayMedicines>
            <DisplayFeeds></DisplayFeeds>
        </div>
    )
} 

export default Dashboard;