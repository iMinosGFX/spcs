import React, {useState, useEffect} from 'react'
import {SubComponentContainer} from "../../../assets/styled-components"
import { ExtractOFContent } from '../../../@types/of';
import GanttAPI from '../../../api/GanttAPI';
import { useToasts } from 'react-toast-notifications';
import moment from 'moment';

interface Props {
    of: ExtractOFContent
}
//TODO: Finir l'appel du composant avec les date du service schedule
const OFSubComponent = ({of}: Props) => {

    const [dateScheduled, setDateScheduled] = useState<{start:string, end:string}>(null)    
    const { addToast } = useToasts()

    useEffect(() => {
        GanttAPI.getOverallIntervalOf(of.number)
        .then(setDateScheduled)
        .catch(() => addToast(`Impossible de récupérer les dates ordonnancées`, {appearance: "error"}))
    }, [])

    return(
        <SubComponentContainer>
              <div>
                <span>Date de début ordonnancé : {dateScheduled?.start && moment(dateScheduled.start).format("DD/MM/YYYY [à] HH:mm")}<span className="font-heavy">{/*{moment(rowProps.scheduled_end_date).subtract(3,'d').format("DD-MM-YYYY")}*/}</span></span><br/>
                <span>Date de fin ordonnancé : {dateScheduled?.end && moment(dateScheduled.end).format("DD/MM/YYYY [à] HH:mm")}<span className="font-heavy">{/*{moment(rowProps.scheduled_end_date).format("DD-MM-YYYY")}*/}</span></span> 
            </div>
           <div>
                <span>Retard : <span className="font-heavy">{of.late ? "En retard" : "Pas de retard"}</span></span><br/> 
                <span>_</span>
            </div>
            <div>
                <span>Qté initiale : <span className="font-heavy">{of.quantityInitial}</span></span><br/>
                <span>Qté réalisée : <span className="font-heavy">{of.quantityProduced}</span></span> 
            </div>
            <div>
                <span>Qté reste à faire : <span className="font-heavy">{of.quantityRemaining}</span></span><br/>
                <span>_</span>
            </div>
            <div>
                <span>Priorité: <span className="font-heavy">{of.priority === 0 ? "Basse" : of.priority === 1 ? "Normale" : "Haute" }</span></span><br/>
                <span>_</span>
            </div>
        </SubComponentContainer>
    )
}

export default OFSubComponent