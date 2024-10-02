import React, { useState } from 'react';
import Carousel from './Carousel'; // Import the Carousel component
import './App.css';
import hbvid from './hbvid.mp4'; // Import the video file

const Home = () => {
  // State to toggle visibility of detailed explanations
  const [showDetails, setShowDetails] = useState([false, false, false, false]);
  const [boxStates, setBoxStates] = useState([false, false, false, false]); // Track collapsed/expanded state

  const toggleDetail = (index) => {
    const updatedShowDetails = [...showDetails];
    updatedShowDetails[index] = !updatedShowDetails[index];

    // Update box state
    const updatedBoxStates = [...boxStates];
    updatedBoxStates[index] = !updatedBoxStates[index];

    setShowDetails(updatedShowDetails);
    setBoxStates(updatedBoxStates);
  };

  // Health facts
  const healthFacts = [
    {
      fact: "Sugar is more addictive than cocaine.",
      detail: "Research has shown that sugar activates the brain's reward system similarly to drugs, leading to the release of dopamine, a neurotransmitter associated with pleasure and reward. This response can create a cycle of cravings, where the more sugar one consumes, the more the brain seeks it out, akin to the patterns seen in substance addiction. Studies have indicated that sugar consumption can stimulate areas of the brain involved in impulsive behavior and craving, making it challenging for individuals to resist sugary foods. Over time, this can result in compulsive eating behaviors, weight gain, and increased risk of metabolic disorders, highlighting the need for awareness and moderation in sugar intake.",
    },
    {
      fact: "Chronic stress can change your DNA.",
      detail: "Chronic stress triggers a biological response that can lead to long-term changes in gene expression through a process known as epigenetics. When the body is under prolonged stress, it produces higher levels of stress hormones like cortisol, which can affect how genes are turned on or off. This alteration can lead to inflammation, impaired immune function, and increased susceptibility to chronic conditions such as heart disease, diabetes, and mental health disorders. Furthermore, these epigenetic changes can potentially be passed down to future generations.",
    },
    {
      fact: "Sleep deprivation can lead to weight gain.",
      detail: "Sleep deprivation disrupts the delicate balance of hormones that regulate appetite and metabolism, significantly increasing the risk of weight gain. When individuals do not get enough sleep, the body produces higher levels of ghrelin, a hormone that stimulates hunger, and lower levels of leptin, a hormone that signals fullness. This hormonal imbalance leads to increased cravings, particularly for high-calorie and carbohydrate-rich foods, which can result in overeating.",
    },
    {
      fact: "Your gut health is linked to mental health.",
      detail: "The gut-brain connection is a complex and dynamic relationship that underscores how the health of your gut can significantly impact your mental well-being. The gut microbiome plays a crucial role in producing neurotransmitters and other chemicals that affect mood and cognitive function.",
    }
  ];

  return (
    <div>
      <p>This is the content of the homepage.</p>
      {/* Display the Carousel */}
      <Carousel />

      {/* Heart Rate Video with autoPlay, loop, and muted */}
      <div className="heart-rate-video-container">
        <video autoPlay loop muted>
          <source src={hbvid} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>

      {/* Health facts section placed below the Heart Rate Video */}
      <div className="uncommon-home-container">
        {healthFacts.map((fact, index) => (
          <div 
            key={index} 
            className={`uncommon-health-fact-box ${boxStates[index] ? 'expanded' : 'collapsed'}`}
          >
            <h3 className="uncommon-fact-heading">{fact.fact}</h3> {/* Heading with specific class */}
            <button onClick={() => toggleDetail(index)} className="uncommon-see-more-btn">
              {showDetails[index] ? "See Less" : "See More"}
            </button>
            {showDetails[index] && <p className="uncommon-fact-detail">{fact.detail}</p>}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
