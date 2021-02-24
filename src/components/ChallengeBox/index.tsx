import styles from '../../styles/components/ChallengeBox.module.css';

export function ChallengeBox(){
    const hasActiveChallenge = true;

    return(
        <div className={styles.challengeBoxContainer}>
            {hasActiveChallenge 
            ? (
                <div className={styles.challengeBoxActive}>
                    <header>Ganhe 300 xp</header>
                    <main>
                        <img src="icons/body.svg"/>
                        <strong>Novo desafio</strong>
                        <p>Levante e faca uma caminhada de 3 minutos</p>
                    </main>
                    <footer>
                        <button type="button"
                        className={styles.challengeSucceededButton}
                        >Ganhei</button>
                        <button type="button"
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