import React from 'react';
import {Pie} from 'react-chartjs-2';
import Grid from '@mui/material/Grid';

const state = {
  
  datasets: [
    {
      label: 'Rainfall',
      backgroundColor: [
        '#B21F00',
        '#C9DE00',
        '#2FDE00',
        '#00A6B4',
        '#6800B4'
      ],
      hoverBackgroundColor: [
      '#501800',
      '#4B5000',
      '#175000',
      '#003350',
      '#35014F'
      ],
      data: [65, 59, 80, 81, 56]
    }
  ],
  labels: ['January', 'February', 'March',
           'April', 'May']
}

export default function RBAFeatures({duration}) {
  
    return (
      <div>
          <h3>Assign Weightage for Rules</h3>
          <Grid container spacing={2}>
            
            <Grid item xs={12} md={4} style={{marginTop: 5}}>
                <center><h4>High</h4></center>
                <Pie
                data={state}
                
                />
            </Grid>

            <Grid item xs={12} md={4} style={{marginTop: 5}}>
                <center><h4>Medium</h4></center>
                <Pie
               
                options={{
                    title:{
                    display:true,
                    text:'Average Rainfall per month',
                    fontSize:20
                    },
                    legend:{
                    display:true,
                    position:'right'
                    }
                }}
                data={state}
                />
            </Grid>

            <Grid item xs={12} md={4} style={{marginTop: 5}}>
                <center><h4>Low</h4></center>
                <Pie
                data={state}
                options={{
                    title:{
                    display:true,
                    text:'Average Rainfall per month',
                    fontSize:20
                    },
                    legend:{
                    display:true,
                    position:'right'
                    }
                }}
                />
            </Grid>
        </Grid>

        <Grid container spacing={2}>
            
        </Grid>

        

        
      </div>
    );
  
}