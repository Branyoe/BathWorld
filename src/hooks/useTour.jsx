
import {
  useState,
  useEffect,
  useMemo,
  useCallback
} from 'react';
import Joyride, {STATUS} from 'react-joyride'; 

const joyrideStyles = {
  options: {
    zIndex: 10000,
    primaryColor: '#0532FF'
  }
}

const useTour = (steps, localStorageKey) => {
  const [isRun, setIsRun] = useState(false);

  useEffect(() => {
    if(!localStorageKey){
      setIsRun(true);
      return;
    }
    const tourViewed = window.localStorage.getItem(localStorageKey)
    if(tourViewed) return;
    window.localStorage.setItem(localStorageKey, "true");
    setIsRun(true);
  }, [localStorageKey]);

  const handleJoyrideCallback = useCallback((data) => {
    const {status} = data;
    const finishedStatus = [STATUS.FINISHED, STATUS.SKIPPED ]
    if(finishedStatus.includes(status)){
      console.log("Finalizado");
    }
  }, [])

  const tour = useMemo(() => (
    <Joyride
      callback={handleJoyrideCallback}
      continuous
      run={isRun}
      scrollToFirstStep
      showProgress
      showSkipButton
      steps={steps}
      styles={joyrideStyles}
      locale={{
        back: 'Atrás',
        next: 'Siguiente',
        open: 'Abrir',
        skip: 'Saltar',
        close: 'Cerrar',
        last: 'Finalizar'
      }}
    />
  ), [steps, handleJoyrideCallback, isRun])

  return tour;
}

export default useTour;