import { createContext, ReactNode, useEffect, useState } from 'react';
import challegens from '../../challenges.json';

interface Challenge {
    type:'body' | 'eye';
    description:string;
    amount:number;
}

interface ChallengsContextData{
    level: number;
    currentExperience: number; 
    challengesCompleted:number;
    experienceToNextLevel:number;
    levelUp:() => void; 
    startNewChallenge: () => void;
    resetChallenged: () => void;
    completeChallenged: () => void;
    activeChallenge: Challenge;
}

interface ChallengeProviderProps {
    children: ReactNode;
}

export const ChallengesContext = createContext({} as ChallengsContextData);

export function ChallengeProvider({children}:ChallengeProviderProps){
    const [level,setLevel] = useState(0);
    const [currentExperience,setCurrentExperience] = useState(0);
    const [challengesCompleted,setChallengesCompleted] = useState(0);
    const [activeChallenge,setActiveChallenge] = useState(null);

    const experienceToNextLevel = Math.pow((level + 1) * 4, 2);

    useEffect(() =>{
        Notification.requestPermission();
    }, []);

    function levelUp(){
      setLevel(level + 1);
    }

    function startNewChallenge(){
        const randomChallengeIndex = Math.floor(Math.random() * challegens.length);     
        const challenge = challegens[randomChallengeIndex];

        setActiveChallenge(challenge);

        new Audio('/notification.mp3').play();

        if(Notification.permission === 'granted'){
            new Notification('Novo Desafio ',{
                body:`Valendo ${challenge.amount} xp!`
            });
        }
    }

    function resetChallenged(){
        setActiveChallenge(null)
    }

    function completeChallenged(){
        if(!activeChallenge){
            return;
        }

        const { amount } = activeChallenge;

        let finalExperience = currentExperience + amount;

        if (finalExperience >= experienceToNextLevel){
            finalExperience = finalExperience - experienceToNextLevel;
            levelUp();
        }

        setCurrentExperience(finalExperience);
        setActiveChallenge(null);
        setChallengesCompleted(challengesCompleted + 1);

    }
    
    return(
        <ChallengesContext.Provider value={{level,levelUp, currentExperience, experienceToNextLevel, challengesCompleted, startNewChallenge, activeChallenge, resetChallenged, completeChallenged}}>
            {children}
        </ChallengesContext.Provider>

    );
}