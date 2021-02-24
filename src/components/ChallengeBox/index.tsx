import { useContext } from 'react';
import { ChallengesContext } from '../../contexts/ChallengeContext';
import styles from '../../styles/components/ChallengeBox.module.css';

export function ChallengeBox(){
    const { activeChallenge,resetChallenged } = useContext(ChallengesContext)

    return(
        <div className={styles.challengeBoxContainer}>
            {activeChallenge 
            ? (
                <div className={styles.challengeBoxActive}>
                    <header>Ganhe { activeChallenge.amount } xp</header>
                    <main>
                        <img src={`icons/${activeChallenge.type}.svg`}/>
                        <strong>Novo desafio</strong>
                        <p>{activeChallenge.description}</p>
                    </main>
                    <footer>
                        <button 
                        type="button"
                        className={styles.challengeSucceededButton}
                        >Ganhei</button>
                        <button
                        onClick={resetChallenged}
                        type="button"
                        className={styles.challengeFailedButton}
                        >Falhei</button>
                    </footer>
                </div>
            )
            :(
            <div className={styles.challengeBoxNotActive}>
                <strong>Finalize um ciclo para receber um desafio</strong>
                <p>
                    <img src="icons/level-up.svg" alt="Level Up"/>
                    Avance de level completando desafios.
                </p>
            </div>
            )
            }
        </div>
    );
}