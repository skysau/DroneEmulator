import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from "@angular/common/http";

@Component({
  selector: 'app-drone-simulator',
  templateUrl: './drone-simulator.component.html',
  styleUrls: ['./drone-simulator.component.css']
})
export class DroneSimulatorComponent implements OnInit {
  zoom: number = 8;
  lat: number = 0;
  lng: number = 0;
  SelectedDroneIndex:number=0;
  lastInfoWindow: any;
  progress=10;
  haveUserDetails:boolean =false
 totalMarker:any[] =[] 
 timer:any=[]
 pasueStatus:any=[];
 stimulatedStatus:any=[]
  //markers: any[] = []
  myUserPreferenceForm: FormGroup;
  userDetail:any
  constructor(private formBuilder: FormBuilder,private http: HttpClient) {
    this.myUserPreferenceForm = this.formBuilder.group({
      noOfDrone: ['', Validators.required],
      place: ['', [Validators.required, Validators.email]],
    });
  }
  ngOnInit(): void {
  }
  getAddressForAGM(address:any){
    const urlMap = `https://maps.googleapis.com/maps/api/geocode/json?address=
        ${address.replace(/\s/g, "")}
      &key=AIzaSyC6nFyXAaMW9J4AE1uVyebaoHScDbMS3RY`;
      return  this.http.get(urlMap);
  }
  onSubmit(){
    this.getAddressForAGM(this.myUserPreferenceForm.value.place).subscribe((res:any) => {
      if (res["results"] && res["results"].length > 0) {
        this.lat=res["results"][0].geometry.location.lat;
        this.lng=res["results"][0].geometry.location.lng;
            if(this.myUserPreferenceForm.value.noOfDrone<=0){
      alert("Please enter a valid number of drone");
    }else{
      for(let i=0;i<this.myUserPreferenceForm.value.noOfDrone;i++){
        this.totalMarker.push([]);
        this.pasueStatus.push(false);
        this.stimulatedStatus.push(false)
      }
      this.haveUserDetails = true
    }
      }
    });

  }
  markerClicked(marker: any,pindex:number, index: number, infoWindowRef: any) {
    if (this.lastInfoWindow) {
      //this.lastInfoWindow.close();
    }
    this.lastInfoWindow = infoWindowRef;
    console.log(marker, index);
  }

  mapClicked($event: any) {
    let mark=[]
   mark.push({
      lat: $event.coords.lat,
      lng: $event.coords.lng,
      label: { color: 'black', text:  `P${this.SelectedDroneIndex+1}` },
      draggable: false,
      time:new Date().toLocaleTimeString(),
      iconUrl:'http://maps.google.com/mapfiles/ms/micons/plane.png'
    });
    mark.push({})
    if(this.SelectedDroneIndex<this.totalMarker.length){
      this.totalMarker[this.SelectedDroneIndex]=mark;
      
    this.SelectedDroneIndex++;
    }else{
      alert("You have reached the limit of drone markers");
    }
    
  }

  markerDragEnd($event: any, index: number) {
    console.log($event.coords.lat);
    console.log($event.coords.lng);
  }
  SimulateDrone(id:any,curr:any,resume?:boolean){
    this.stimulatedStatus[id]=true
    let target=300;
    let current=Number(curr)
    let dronePosition={lat: this.totalMarker[id][0].lat,
      lng: this.totalMarker[id][0].lng,
      label: { color: 'blue', text:  `current Status ` },
      draggable: false,
      time:new Date().toLocaleTimeString(),
      iconUrl:'http://maps.google.com/mapfiles/ms/micons/plane.png'}
    if(resume){
      dronePosition = {
        lat: this.totalMarker[id][1].lat,
        lng: this.totalMarker[id][1].lng,
        label: { color: 'blue', text:  `current Status` },
        draggable: false,
        time:new Date().toLocaleTimeString(),
        iconUrl:'http://maps.google.com/mapfiles/ms/micons/plane.png'
      };
    }else{
      this.totalMarker[id][0].iconUrl=''
  dronePosition = {
    lat: this.totalMarker[id][0].lat,
    lng: this.totalMarker[id][0].lng,
    label: { color: 'blue', text:  `current Status` },
    draggable: false,
    time:new Date().toLocaleTimeString(),
    iconUrl:'http://maps.google.com/mapfiles/ms/micons/plane.png'
  };
    }

  // while(current<target){
     this.timer[id] = setInterval(() => {
    dronePosition.lat += 0.01;
    dronePosition.lng += 0.01;
    dronePosition.time=new Date().toLocaleTimeString(),
    dronePosition.label.text = `current Status `;
    this.totalMarker[id][1]=dronePosition;
    current++;
    //this.lat +=0.00000000000001;
    // pathCoordinates.push({ lat: dronePosition.lat, lng: dronePosition.lng });
    if (current >= 300) {
      clearInterval(this.timer[id]);
    }
  }, 1000); 
  //}
  
  }
  configDrone(){
    this.haveUserDetails=false
  }
  PauseDrone(id:any,time:any){
    this.pasueStatus[id]=true
    clearInterval(this.timer[id]);
  }
  ResumeDrone(id:any,time:any){
    if(this.pasueStatus[id]){
      this.SimulateDrone(id,time,true);
      this.pasueStatus[id]=false
    }
    
  }
}
