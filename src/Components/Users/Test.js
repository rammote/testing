import React from "react";
import { compose, withProps } from "recompose";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
  Circle
} from "react-google-maps";

export const MyMapComponent = compose(
  withProps({
    /**
     * Note: create and replace your own key in the Google console.
     * https://console.developers.google.com/apis/dashboard
     * The key "AIzaSyBkNaAGLEVq0YLQMi-PYEMabFeREadYe1Q" can be ONLY used in this sandbox (no forked).
     */
    googleMapURL:
      "https://maps.googleapis.com/maps/api/js?key=AIzaSyBIG7NI90M-f2RFWXxwWwCZL9tpowvBrKA&v=3.exp&libraries=geometry,drawing,places",
    loadingElement: <div style={{ height: `50%` }} />,
    containerElement: <div style={{ height: `350px` }} />,
    mapElement: <div style={{ height: `100%` }} />
  }),
  withScriptjs,
  withGoogleMap
)(props => (
  <GoogleMap defaultZoom={3} defaultCenter={{ lat: parseInt(props.rows[props.rows.length-1].lattitude), lng:  parseInt(props.rows[props.rows.length-1].longitude) }}>
    {props.isMarkerShown && 
        props.rows.map((item,index)=>(
            // <Marker position={{ lat: -34.397, lng: 150.644 },{ lat: -31.397, lng: 140.644 }} />
            // <Circle
            //         key={index}
            //         center={{ lat: parseInt(item.lattitude), lng:parseInt(item.longitude) }}
            //         radius={1000}
            //         options={{
            //             strokeColor: "#66009a",
            //             strokeOpacity: 0.8,
            //             strokeWeight: 8,
            //             fillColor: `#red`,
            //             fillOpacity: 0.35,
            //             zIndex: 1
            //         }}
            //     />
            <Marker key={index} position={{ lat: parseInt(item.lattitude), lng: parseInt(item.longitude) }} />

        ))
    
    }
  </GoogleMap>
));