import Class from "./WelcomePage.module.css";
import SignupCard from "../components/user/SignupCard";

function WelcomePage() {
  return (
    <div className={Class.container}>
      <img src="/pexels-jonathan-borba-3622478.jpg" alt="oatmel on wooden table" />
      <div className={Class.background}>
        <SignupCard />
      </div>
    </div>
  );
}

export default WelcomePage;
