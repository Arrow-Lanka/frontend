import React, { useState, useEffect } from "react";
import Chart from 'react-apexcharts';
import Highcharts from 'highcharts';

function Donutchart() {
    const [countryName, setCountryName] = useState([]);
    const [medal, setMedal] = useState([]);

    useEffect(() => {
      const getData = async () => {
          try {
              const reqData = await fetch("https://jsonplaceholder.typicode.com/users");
              const resData = await reqData.json();

              // Extracting relevant data from the response
              const names = resData.map(user => user.name);
              const ids = resData.map(user => user.id);

              // Setting the extracted data to state
              setCountryName(names);
              setMedal(ids);
          } catch (error) {
              console.error('Error fetching data:', error);
          }
      };

      getData();
  }, []);

    return (
        <React.Fragment>
            <div className='container-fluid mt-3 mb-3'>
                {/* <h2 className="text-left">Donut Chart</h2> */}
                <Chart
                    type="donut"
                    width={450}
                    height={380}
                    series={medal}
                    options={{
                        labels: countryName,
                        title: {
                            // text: "Medal Country Name",
                        },
                        plotOptions: {
                            pie: {
                                donut: {
                                    labels: {
                                        show: true,
                                        total: {
                                            show: true,
                                            showAlways: true,
                                            fontSize: 30,
                                            color: '#f90000',
                                        }
                                    }
                                }
                            }
                        },
                        dataLabels: {
                            enabled: true,
                        }
                    }}
                />
            </div>
        </React.Fragment>
    );
}
export default Donutchart;
