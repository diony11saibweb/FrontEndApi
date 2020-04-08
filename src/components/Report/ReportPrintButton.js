import React from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

import Button from '~/components/Button';

// converte pixel para milímetros
const pxToMm = (px) => {
  return Math.floor(px/document.getElementById('myMm').offsetHeight);
};

// converte milímetros para pixel
const mmToPx = (mm) => {
  return document.getElementById('myMm').offsetHeight*mm;
};

const range = (start, end) => {
    return Array(end-start).join(0).split(0).map(function(val, id) {return id+start});
};


const ReportPrintButton = ({id, text, icon}) => {

    const converteHtmlParaPdf = () => {

        const input = document.getElementById(id);
        const inputHeightMm = pxToMm(input.offsetHeight);
        const a4WidthMm = 210;
        const a4HeightMm = 297; 
        const a4HeightPx = mmToPx(a4HeightMm); 
        const numPages = inputHeightMm <= a4HeightMm ? 1 : Math.floor(inputHeightMm/a4HeightMm) + 1;
        
        console.log({
            input, inputHeightMm, a4HeightMm, a4HeightPx, numPages, range: range(0, numPages), 
            comp: inputHeightMm <= a4HeightMm, inputHeightPx: input.offsetHeight
        });
        
        /* Cria um print da div em PNG exatamente como está sendo exibida, preservando altura e largura.
         * Em seguida converte a imagem para PDF.
         */
        html2canvas(input)
        .then((canvas) => {
            const imgData = canvas.toDataURL('image/png');
            let pdf = null;
            // Caso o tamanho da div ultrapasse o valor de uma página A4 faz a quebra de páginas
            if (inputHeightMm > a4HeightMm) {
            
                pdf = new jsPDF('p', 'mm', [inputHeightMm+16, a4WidthMm]);
            } else {
            
                pdf = new jsPDF();
            }
            
            pdf.addImage(imgData, 'PNG', 0, 0);
            pdf.save(`${id}.pdf`);
        });
    }

    return (
    
        <div>
            {/*
            Getting pixel height in milimeters:
            https://stackoverflow.com/questions/7650413/pixel-to-mm-equation/27111621#27111621
            */}
            <div id="myMm" style={{height: "1mm"}} />
        
            <Button text={text} icon={icon} action={converteHtmlParaPdf} />            
        </div>
    )
};

export default ReportPrintButton;