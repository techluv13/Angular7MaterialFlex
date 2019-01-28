import { Component, OnInit, ViewChild, ElementRef, NgZone, AfterViewInit } from '@angular/core';
import * as THREE from 'three';
import { ChildOneComponent } from '../child-one/child-one.component';
import { ChildTwoComponent } from '../child-two/child-two.component';
var OrbitControls = require('three-orbit-controls')(THREE);

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit, AfterViewInit {
  private scene: THREE.Scene;
  private renderer: THREE.WebGLRenderer;
  private light: THREE.PointLight;
  private camera: THREE.PerspectiveCamera;
  private controls: THREE.OrbitControls;
  private orthographicCamera: THREE.OrthographicCamera;
  private ngZone: NgZone;
  private activeChild = 1;
  childComponent = ChildOneComponent;

  constructor() {
    this.ngZone = new NgZone({});
  }
  @ViewChild('rendererContainer') rendererContainer: ElementRef;

  ngOnInit() {
    window.addEventListener('resize', () => this.onWindowResize());
  }

  ngAfterViewInit() {
    this.setScene();
    this.setCamera();
    this.setControls();
    this.setRenderer();
    this.addFloor();
    this.addObject();
    this.setLight();
  }

  toggleChild() {
    if (this.activeChild === 1) {
      this.childComponent = ChildTwoComponent;
      this.activeChild = 2;
    } else {
      this.childComponent = ChildOneComponent;
      this.activeChild = 1; 
    }
  }

  private onWindowResize() {
    this.camera.aspect = this.rendererWidth / this.rendererHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(this.rendererWidth, this.rendererHeight);
  }

  private setScene() {
    this.scene = new THREE.Scene();
  }

  private setRenderer() {
    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setSize(this.rendererWidth, this.rendererHeight, true);
    this.rendererContainer.nativeElement.appendChild(this.renderer.domElement);
    this.renderer.setClearColor(0xffffff);
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.BasicShadowMap;
    this.animate();
  }

  private setCamera() {
    this.camera = new THREE.PerspectiveCamera(60, this.rendererWidth / this.rendererHeight, 0.1, 1000);
    this.camera.position.z = 100;
  }

  private setLight() {
    this.light = new THREE.PointLight(0x00fcef, 1);
    this.light.castShadow = true;
    this.light.position.set(0, 40, 0);
    this.light.shadow.mapSize.width = 512;
    this.light.shadow.mapSize.height = 512;
    this.light.shadow.camera.near = 0.5;
    this.light.shadow.camera.far = 500
    this.scene.add(this.light);
  }

  private setControls() {
    this.controls = new OrbitControls(this.camera, this.rendererContainer.nativeElement);
    this.controls.rotateSpeed = 1.0;
    this.controls.zoomSpeed = 1.2;
  }

  private generateObject(width: number, height: number, depth: number) {
    return new Promise((resolve, reject) => {
      const objectGeometry = new THREE.BoxGeometry(width, height, depth);
      const objectMaterial = Array(6).fill(0).map((i, index) => this.getMaterial({ face: index }));
      const objectMesh = new THREE.Mesh(objectGeometry, objectMaterial);
      objectMesh.receiveShadow = true;
      objectMesh.castShadow = true;
      objectMesh.position.set(30 * Math.random(), 30 * Math.random(), 30 * Math.random());
      resolve(objectMesh);
    });
  }

  private getMaterial({ face = 1, color = 0x00ff00, shininess = 0.9 }) {
    switch (face) {
      case 0:
        color = 0x00ff00;
        break;

      case 1:
        color = 0xffff00;
        break;

      case 2:
        color = 0x00ffff;
        break;

      case 3:
        color = 0xff00ff;
        break;

      case 4:
        color = 0xff0000;
        break;

      case 5:
        color = 0xf0ffff;
        break;
    }
    return new THREE.MeshStandardMaterial({
      color: color,
    })
  }

  addObject() {
    this.generateObject(10, 10, 10).then((object: THREE.Mesh) => {
      this.scene.add(object);
    });

  }

  addFloor() {
    const floorGeometry = new THREE.PlaneBufferGeometry(100, 100);
    const floorMaterial = new THREE.MeshStandardMaterial({
      color: 0xe3e3e3,
      side: THREE.DoubleSide
    });
    const floorMesh = new THREE.Mesh(floorGeometry, floorMaterial);
    floorMesh.receiveShadow = true;
    floorMesh.rotateX(Math.PI / 2);
    this.scene.add(floorMesh);
  }

  private get rendererWidth() {
    return this.rendererContainer.nativeElement.clientWidth;
  }

  private get rendererHeight() {
    return this.rendererContainer.nativeElement.clientHeight;
  }

  private animate() {
    this.ngZone.runOutsideAngular(() => {
      this.controls.update();
      this.renderer.render(this.scene, this.camera);
      requestAnimationFrame(() => {
        this.animate();
      });
    });
  }
}
