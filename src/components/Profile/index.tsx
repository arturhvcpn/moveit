import styles from '../../styles/components/Profile.module.css';

export function Profile(){
    return (
        <div className={styles.profileContainer}>
            <img src="https://github.com/arturhvcpn.png" alt="Artur Polo Norte"/>
            <div>
                <strong>Artur Polo Norte</strong>
                <p>
                    <img src="icons/level.svg" alt="Level"/>
                    Level 0
                </p>
            </div>
        </div>
    );
}