<template>
    <div class="map-view">
      <div class="sidebar">
        <h2>Hospitals</h2>
        <p>Select a hospital to get directions:</p>
        <p><strong>Here is your information: </strong></p>
        <p v-if="selectedHospital">Name: <strong>{{ selectedHospital.name }}</strong></p>
        <p v-if="distance">Distance: {{ distance }} km</p>
        <p v-if="estimatedTime">Estimated Time: {{ estimatedTime }} minutes</p>
  
        <!-- Add a section for route instructions -->
        <div v-if="routeInstructions.length">
          <h4>Route Instructions:</h4>
          <ol>
            <li v-for="(instruction, index) in routeInstructions" :key="index">{{ instruction }}</li>
          </ol>
        </div>
      </div>
      <div class="map-container">
        <div v-if="isLoading" class="loading-spinner"></div>
        <div id="map"></div>
      </div>
    </div>
  </template>
  
  <script>
  import mapboxgl from 'mapbox-gl';
  import 'mapbox-gl/dist/mapbox-gl.css';
  import MapboxDirections from '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions';
  import '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions.css';
  import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
  
  export default {
    name: 'MapView',
    data() {
      return {
        isLoading: true,
        selectedHospital: null,
        distance: null,
        estimatedTime: null,
        routeInstructions: [], // To hold route instructions
        map: null,
        directions: null,
      };
    },
    mounted() {
      mapboxgl.accessToken = 'pk.eyJ1IjoicGNoZTAwOTYiLCJhIjoiY20yZGN0NHQ2MHRrajJzb2ZnamhkaWpvbyJ9.L2fW_W6GNS4xRxi7XDdfCg';
  
      navigator.geolocation.getCurrentPosition((position) => {
        const userLocation = [position.coords.longitude, position.coords.latitude];
  
        this.map = new mapboxgl.Map({
          container: 'map',
          style: 'mapbox://styles/mapbox/streets-v11',
          center: userLocation,
          zoom: 12,
        });
  
        this.map.on('load', () => {
          this.isLoading = false;
        });
  
        this.addHospitalMarkers(userLocation);
         const geocoder = new MapboxGeocoder({
          accessToken: mapboxgl.accessToken,
          mapboxgl: mapboxgl
        });

        this.map.addControl(geocoder);

    // Add Geolocation control to track user location
    this.map.addControl(
      new mapboxgl.GeolocateControl({
        positionOptions: {
          enableHighAccuracy: true,
        },
        trackUserLocation: true,
        showUserHeading: true,
        showAccuracyCircle: false,
      }),
      'top-right'
    );
  
        this.directions = new MapboxDirections({
          accessToken: mapboxgl.accessToken,
          unit: 'metric',
          profile: 'mapbox/driving',
          controls: {
            inputs: false,
            instructions: false, // Disable default instructions
          },
        });

        
  
        this.map.addControl(this.directions, 'top-left');
        this.directions.setOrigin(userLocation);
  
        this.directions.on('route', (event) => {
          const route = event.route[0];
          this.distance = (route.distance / 1000).toFixed(2);
          this.estimatedTime = Math.round(route.duration / 60);
  
          // Get and store route instructions
          this.routeInstructions = route.legs[0].steps.map(step => step.maneuver.instruction);
        });
      });
    },
    methods: {
      addHospitalMarkers(userLocation) {
        fetch('https://myhospitalsapi.aihw.gov.au/api/v0/retired-myhospitals-api/hospitals')
          .then(response => response.json())
          .then(data => {
            data.forEach(hospital => {
              if (hospital.latitude && hospital.longitude) {
                const marker = new mapboxgl.Marker()
                  .setLngLat([hospital.longitude, hospital.latitude])
                  .addTo(this.map);
  
                marker.getElement().addEventListener('click', () => {
                  this.selectedHospital = hospital;
                  this.directions.setDestination([hospital.longitude, hospital.latitude]);
                });
              }
            });
          });
      },
    },
  };
  </script>
  
  <style scoped>
  .map-view {
    display: flex;
    height: calc(100vh - 60px);
  }
  .sidebar {
    width: 300px;
    padding: 20px;
    background-color: #f8f9fa;
    overflow-y: auto;
  }
  .map-container {
    flex: 1;
    position: relative;
  }
  #map {
    width: 100%;
    height: 100%;
  }

  </style>
  
  