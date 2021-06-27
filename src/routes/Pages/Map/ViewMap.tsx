import React, {useState, useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { clearBreadCrumb, setContentTitle, setSecondaryNav } from '../../../store/navigation/action'
import { rewriteMainContentBackground } from '../../../helpers/utils'
import styled from 'styled-components';
import useModal from "@optalp/use-modal"
import Select from "react-select"
import { UserState } from '../../../store/user/reducer';
import StoragesAPI from '../../../api/StoragesAPI';
import _ from "lodash"

const Container = styled.div`
    width: 90%;
    height: 80vh;
    margin: 15px auto;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
    grid-template-rows: 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
`

const Cell = styled("div")<{getStorage: boolean, color?:string}>`
  font-size: 1rem;
  text-align: center;
  padding: 1rem;
  box-sizing: border-box;
  border: 1px solid #c8c8c8;
  background: ${props => props.getStorage ? props.color : "#fff"};
  &:hover{
      background: #e7e7e7;
  }
`

export type ShelvePosition = {
    storageId: number
    position: {
        start:number[]
        end:number[]
    }[]
}

const options = [
    {value:"HORIZONTAL", label: "Horizontal"},
    {value:"VERTICAL", label: "Vertical"}
]

const colorsPicker = ['#ff4ae7', '#ef5777', '#ff9f43', '#ffd32a', '#6aceb6', '#27ae60', '#01a3a4', '#3498db', '#ee5253'];


const ViewMap = () => {

    const dispatch = useDispatch()
    const { Modal, isShowing: isModalShowed, open, close } = useModal();
    const [modalSize, setModalSize] = useState<string>("1")
    const [modalSelect, setModalSelect] = useState<{value:"HORIZONTAL" | "VERTICAL", label:string}>({value:"HORIZONTAL", label: "Horizontal"})
    const [selectedCoords, setSelectedCoords] = useState<number[]>(null)
    const {connectedUser} = useSelector<UserState, UserState>((state: UserState) => state)
    const [storages, setStorages] = useState<{value:number, label:string}[]>([])
    const [selectedStorages, setSelectedStorages] = useState<{value:number, label:string}>(null)
    const [cells, setCells] = useState<ShelvePosition[]>([])

    function loadStorages(){
        StoragesAPI.readStoragesWithoutPositions(connectedUser.id)
        .then(data => setStorages(Object.keys(data).map(p => ({value: parseInt(p), label: data[p]}))))
    }

    function loadPositions(){
        StoragesAPI.readPositions(connectedUser.id)
        .then(data => { 
            let _stepPositions = Object.keys(data).map(sto => {
                let _steptest = []
                for(let b = data[sto].start[0]; b <= data[sto].end[0]; b++){
                    for(let c = data[sto].start[1]; c <= data[sto].end[1]; c++){
                        _steptest.push(`${b},${c}`)
                    }
                }
                return ({
                    id: sto,
                    steps: _steptest,
                    color: colorsPicker[Math.floor(Math.random() * colorsPicker.length)]
                })
            })

            const cells = []
            for(let x = 0; x < 10; x++){
                for(let y = 0; y < 13; y++){
                    let cell = _.find(_stepPositions, (p) => p.steps.includes(`${x},${y}`))
                    if(!!cell){
                        cells.push(
                            <Cell key={`${x}_${y}`} onClick={() => {handleDeleteStorage(cell.id)}} getStorage={true} color={cell.color}>
                                {cell.id}
                            </Cell>
                        )
                    } else {
                        cells.push(
                            <Cell key={`${x}_${y}`} onClick={() => {open(); setSelectedCoords([x,y])}} getStorage={false}>
                                {/* Click me */}
                            </Cell>
                        )
                    }
                }
            }
            setCells(cells)
        })
    }

    useEffect(() => {
        dispatch(clearBreadCrumb())
        dispatch(setContentTitle('Carte du magasin'))
        dispatch(setSecondaryNav('none'))
        rewriteMainContentBackground('#fff')
    }, [])
    
    useEffect(() => {
        loadStorages()
        loadPositions()
    }, [connectedUser])

    const handleCellSubmit = () => {
        let _coordsEnd = {x: selectedCoords[0], y: selectedCoords[1]};

        if(modalSelect.value === "HORIZONTAL"){
            _coordsEnd["y"] = selectedCoords[1] + parseInt(modalSize)-1
        } else {
            _coordsEnd["x"] = selectedCoords[0] + parseInt(modalSize)-1
        }

        let _position = {
            start: [selectedCoords[0], selectedCoords[1]],
            end: [_coordsEnd["x"], _coordsEnd["y"]]
        }

        StoragesAPI.updateArrangement(connectedUser.id, {
            supermarketId: connectedUser.id,
            positions: [
                {
                    storageId: selectedStorages.value,
                    position: _position
                }
            ]
        })
        .then(() => {
            loadStorages()
            close()
            window.location.reload()
        })
    }
    
    const handleDeleteStorage = (id: string) => {
        if(window.confirm(`Voulez vous vraiment supprimer cet espace de stockage ? (id : ${id}`)){
            StoragesAPI.deleteStoragePosition(connectedUser.id, parseInt(id))
            window.location.reload()
        }
    }

    return(
        <>
            <Container>
                {cells}
            </Container>
            <Modal
                isShowing={isModalShowed}
                hide={close}
                widthPercentage={50}
                title="Liste des produits à ajouter"
                primaryBtn
                onBtnClick={handleCellSubmit}
                buttonText="Valider"
                closeOnDocumentClick
                primaryColor="#27ae60">
                    <div style={{width: "50%", margin:"15px auto"}}>
                        <label>Affecté à</label>
                        <Select 
                            options={storages}
                            value={selectedStorages}
                            classNamePrefix="reactSelectInput"
                            onChange={e => setSelectedStorages(e)}/>
                        <br/>
                        <label>Taille</label>
                        <input 
                            type="number" 
                            value={modalSize}
                            onChange={e => setModalSize(e.currentTarget.value)}/>
                        <br/>
                        <label>Direction</label>
                        <Select 
                            options={options}
                            value={modalSelect}
                            classNamePrefix="reactSelectInput"
                            onChange={e => setModalSelect(e)}/>
                    </div>
            </Modal>
        </>
    )
}

export default ViewMap