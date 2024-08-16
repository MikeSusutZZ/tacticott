import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import './About.css'; // Add styling for the about page

function About() {
  return (
    <Container className="about-container">
      <h1 className="text-center my-4">About Tacticott Stats</h1>
      <Row className="mb-4">
        <Col md={6}>
          <h3>Offense (Off)</h3>
          <p>
            Offense measures a Pokémon's raw power and ability
             to deal damage directly to opponents without any set up.
             How much of a threat is this pokemon solo on turn 1
          </p>
        </Col>
        <Col md={6}>
          <h3>Self Set-up (SSu)</h3>
          <p>
            Self Set-up refers to a Pokémon's capability to enhance its own stats or condition before striking.
             This includes moves like Swords Dance, Dragon Dance, or Calm Mind, where the Pokémon improves its
            power, speed, or durability for greater effectiveness in battle.
          </p>
        </Col>
      </Row>
      <Row className="mb-4">
        <Col md={6}>
          <h3>Allied Set-up (ASa)</h3>
          <p>
            Allied Set-up measures how well a Pokémon can be supported by its teammates.
             This includes abilities and moves that benefit from ally actions, such as having
              the ability Justified to boost Attack when hit by a Dark-type move like Beat Up from an ally, or
              speed / damage being boosted by weather. DO NOT consider tailwind or trick room under this, as that applies to
              all pokemon and isn't unique to it, unless speed makes a difference to the effect of a move, ex. Fishous Rend
          </p>
        </Col>
        <Col md={6}>
          <h3>Bulk (Blk)</h3>
          <p>
            Bulk evaluates a Pokémon's ability to withstand attacks and remain on the field.
             It takes into account both physical and special defenses, HP, Typing, and abilities, indicating
              how much damage a Pokémon can absorb before being knocked out.
          </p>
        </Col>
      </Row>
      <Row className="mb-4">
        <Col md={6}>
          <h3>Set-up Support (SuS)</h3>
          <p>
            Set-up Support refers to a Pokémon's ability to assist its team by setting up beneficial conditions,
             such as Screens, Tailwind or Trick Room, and Weather / Terrain. These moves enhance the team's effectiveness
              and longevity in battle.
          </p>
        </Col>
        <Col md={6}>
          <h3>Obstructive Support (ObS)</h3>
          <p>
            Obstructive Support evaluates how well a Pokémon can disrupt the opponent's strategy through status moves,
             Fake Out, and other tactics. This includes moves like Thunder Wave, Follow Me, and Taunt,
              which hinder the opponent's plans and create openings for your team. Setting terrain / weather should also be considered,
              as wile it sets up for you, it also denies your opponent their set up.
          </p>
        </Col>
        <Row className='mb-12'>
            <h3>Speed Modifications</h3>
            <p>If a pokemon often acts at a different speed than it's pure stat, this will specify it. If a mon has swift swim, speed boost
                or similar abilities, and potentially even is a dragon dance user, it would be described as having speed boosting.
                Pokemon such as Rillaboom and Kingambit often focus on their priority moves, but thir game plan does not rely on it, so they would be described as
                'Some use of priority', while pokemon with Prankster or PaoNite strategies are entriely reliant on priority, and would be described accordingly.
            </p>
        </Row>
      </Row>
    </Container>
  );
}

export default About;
