import React, { useState, useEffect } from "react";

export default function Personr() {

    //const [page, setPage] = useState(1);
    const [personrdata, setPersnrData] = useState([]);

    useEffect(() => {
        fetch(
          `https://skatteverket.entryscape.net/rowstore/dataset/b4de7df7-63c0-4e7e-bb59-1f156a591763?_limit=10&_offset=${Math.floor(Math.random() * 20000)}`,
          {
            method: "GET",
            headers: new Headers({
              Accept: "application/json"
            })
          }
        )
          .then(res => res.json())
          .then(response => {
            setPersnrData(response.results);
            console.log(response);
          })
          .catch(error => console.log(error));
      }, []);

      //Returns the gender symbol from personnummer
      function getGender(personnummer){
            let second_last_nr_str = personnummer.substr(10, 1);
            let second_last_nr = parseInt(second_last_nr_str);

            let rstr = ""
            // &#9794; &#9792; U+2640 U+2642
            if (second_last_nr % 2 === 0){
                //console.log("F");
                rstr = '\u2640';
            }
            else {
                //console.log("M");
                rstr = '\u2642';
            }

            return rstr;
      }
    
      return (
        <div className="maindiv">
            <h1>Testpersonnummer från Skatteverket</h1>
           
            <p>Här kan du hämta personummer från Skatteverkets databas som kan användas till testning eller för övning i exempel löne program som Visma. Du kan <b>skapa nya</b> personnummer genom att ladda om sidan: (Ctrl)+(r)</p> 
            <ul>
                
                {personrdata.map( (persnritem, index) => ( <li key={index} > {getGender(persnritem.testpersonnummer)}  {persnritem.testpersonnummer}</li>  )
                    )    
                }

            </ul>
            <p>Om näst sista siffran i personnummret är jämnt tillhör det en kvinna och är siffran udda en man. </p>
            <strong>&copy; Jens Lundeqvist</strong>

        </div>
    )
}
