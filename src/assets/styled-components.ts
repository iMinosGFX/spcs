import styled from 'styled-components'

const TableStyles = styled("div")<{lineSpacing?: string}>`
table {
  border-spacing: 0;
  width:100%;
    thead{
      text-align:left;
      padding:0 40px;
    }
  }
  tbody{
    color:#57606F;
    tr{
        height: ${props => props.lineSpacing === "high" ? "70px" : props.lineSpacing === "medium" ? "50px" : "30px"};
        border-bottom: 1px solid #F0F0F0;
        &:hover{
          background-color: "#F5F5F5";
        }
    }
  }
  .footerTable{
    border-top: 1px solid rgba(22,125,255,0.15);
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 55px;
    color: #216A9A;
    select{
      background: none !important;
      min-width: fit-content;
    }
  }
  @media only screen and (max-width: 540px){
    th{
      white-space: nowrap;
    }
    tbody{
      td{
        white-space: nowrap;
      }
    }
  }
`

const SubComponentContainer = styled.div`
    div{
        padding-left: 40px;
        float:left;
    }
    span{
        line-height:40px;
    }
`


const Divider = styled("div")<{width: number}>`
  height: 1px;
  width: ${props => props.width+"%"};
  margin:0 auto;
  margin-top:5px;
  margin-bottom:5px;
  background: #57606f;
`


const ModalContainer = styled("div")<{width?: number, height?: number, isDark?: string}>`
  padding: 25px;
  min-width: ${props => props.width ? props.width+"px" : "1200px"};
  max-height: ${props => props.height ? props.height+"px" : "800px"};
  border-radius: 5px;
  background: ${props=> props.isDark === "true" ? "#2a3c4e" : "#fff"};
  z-index:999999;
`



export {
  TableStyles,
  SubComponentContainer,
  Divider,
  ModalContainer
}