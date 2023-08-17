import Calculator from "../components/coach/Calculator";
import Class from "./CoachPage.module.css";

function CoachPage() {
  return (
    <div className={Class.page}>
      <section>
        <h1>Coach</h1>
        <h2>Your Personalized Calorie Intake Guide</h2>
        <h3>How Coach Works:</h3>
        <article>
          Using the trusted Harris-Bernedict formula to calculate your Basal Metabolic Rate (BMR) and taking into
          account your current weight, goal weight, activity level, preferred intensity, and gender Coach formulates a
          tailor-made calorie intake goal that aligns perfectly with your health fitness goals. Whether you're looking
          to lose weight steadily, embark on an intense fitness journey, or just sustain your ideal physique, Coach has
          got you covered.
        </article>
        <Calculator />
      </section>
    </div>
  );
}

export default CoachPage;
