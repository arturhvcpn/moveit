import { createContext, ReactNode, useEffect, useState } from 'react';
import Cookies from 'js-cookie'
import challegens from '../../challenges.json';
import { LevelUpModal } from '../components/LevelUpModal';

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
    closeLevelUpModal: () => void;
    activeChallenge: Challenge;
}

interface ChallengeProviderProps {
    children: ReactNode;
    level:number;
    currentExperience:number;
    challengesCompleted:number;
}

export const ChallengesContext = createContext({} as ChallengsContextData);

export function ChallengeProvider({children, ...rest }:ChallengeProviderProps){
    const [level,setLevel] = useState(rest.level ?? 1);
    const [currentExperience,setCurrentExperience] = useState(rest.currentExperience ?? 0);
    const [challengesCompleted,setChallengesCompleted] = useState(rest.challengesCompleted ?? 0);
    
    const [activeChallenge,setActiveChallenge] = useState(null);
    const [isLevelUpModalOpen, setIsLevelUpModalOpen] = useState(false);

    const experienceToNextLevel = Math.pow((level + 1) * 4, 2);

    useEffect(() =>{
        Notification.requestPermission();
    }, []);

    useEffect(() =>{
        Cookies.set('currentExperience',String(currentExperience))
        Cookies.set('level',String(level))
        Cookies.set('challengesCompleted',String(challengesCompleted))

    },[level, currentExperience,challengesCompleted]);

    function levelUp(){
      setLevel(level + 1);
      setIsLevelUpModalOpen(true);
    }
    function closeLevelUpModal(){
        setIsLevelUpModalOpen(false);
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
        <ChallengesContext.Provider value={{level,levelUp, currentExperience, experienceToNextLevel, challengesCompleted, startNewChallenge, activeChallenge, resetChallenged, completeChallenged, closeLevelUpModal}}>
            {children}
           {isLevelUpModalOpen &&  <LevelUpModal />}
        </ChallengesContext.Provider>

    );
}