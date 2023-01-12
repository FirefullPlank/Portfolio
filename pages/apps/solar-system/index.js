import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Suspense, useRef } from 'react';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

const Planet = (props) => {
    // This reference gives us direct access to the THREE.Mesh object
    const ref = useRef();
    // Load the textures
    const texture = new THREE.TextureLoader().load(props.texture);

    useFrame((state, delta) => {
        ref.current.rotation.y += delta / 10;

        if (props.speed == 0) return;

        // props.speed is the km/h speed of the planet
        const speed = (props.speed / 1000 / 60 / 60) * 2000;
        const t = state.clock.getElapsedTime() * speed + props.offset;

        const x = props.xRadius * Math.sin(t);
        const z = props.zRadius * Math.cos(t);
        ref.current.position.x = x;
        ref.current.position.z = z;
    }
    );
    // Return the view
    return (
        <>
            <mesh
                position={props.position}
                ref={ref}
                scale={props.size}
                onClick={(e) => console.log('click')}
            >
                <sphereGeometry args={[1, 32, 32]} />
                <meshStandardMaterial map={texture} />
            </mesh>
            <Ecliptic xRadius={props.xRadius} zRadius={props.zRadius}/>
            {props.ring && <Ring radius={props.ringRadius} tube={props.ringTube} position={props.position} color={props.ringColor}/>}
        </>
    )
}

const Ecliptic = ({ xRadius = 1, zRadius = 1}) => {

    const points = [];
      for (let index = 0; index < 64; index++) {
        const angle = (index / 64) * 2 * Math.PI;
        const x = xRadius * Math.cos(angle);
        const z = zRadius * Math.sin(angle);
        points.push(new THREE.Vector3(x, 0, z));
      }
    points.push(points[0]);
    const lineGeometry = new THREE.BufferGeometry().setFromPoints(points);
      return (
        <line geometry={lineGeometry}>
          <lineBasicMaterial attach="material" color="#BFBBDA" linewidth={10} />
        </line>
      );
}

const Ring = ({ radius = 1, tube = 10, radialSegments = 64, tubularSegments = 64, position = [0, 0, 0], color = 'white' }) => {


    return (
        <mesh position={position} rotation={[Math.PI / 2, 0, 0]} >
            <torusGeometry 
            args={[radius, tube, radialSegments, tubularSegments]} 
            />
            <meshStandardMaterial 
            color={color}
            // map={texture}
            transparent
            opacity={0.8}
            />
        </mesh>
    )
};

// const CameraSettings = (props) => {
//     // Get the camera and the controls from the useThree hook
//     const { camera, controls } = useThree();

//     const raycaster = new THREE.Raycaster();

//     useFrame((state, delta) => {
//         // Update the raycaster with the camera's position and direction
//         raycaster.setFromCamera(new THREE.Vector2(0, 0), camera);
//         // Check for intersections with the planets
//         const intersections = raycaster.intersectObjects(props.planets);
//         if (intersections.length > 0) {
//             // If an intersection is found, prevent the camera from moving any further
//             camera.position.lerp(intersections[0].point, 0.1);
//         }
//     });
// }


const SolarSystem = () => {
    const scalingFactor = 500;
    const sizeScalingFactor = 20;

    // Asteroid Belt
    const asteroidColor = "#7f7f7f";
    const asteroidSize = 0.2*sizeScalingFactor;
    const asteroidCount = 2000;
    const semiMajorAxis = 3.6 * scalingFactor;
    const semiMinorAxis = 3.2 * scalingFactor;
    const angleIncrement = (Math.PI * 2) / asteroidCount;

    return (
        <div className='canvas'>
            <Canvas camera={{ position: [2600, 1500, -600], fov: 45, far: 60000, near:0.1 }}>
                <Suspense fallback={null}>
                    <OrbitControls minDistance={50} maxDistance={50000}/>
                    {/* <CameraSettings planets/> */}
                    <ambientLight />
                    { /* Render the sun and the light */ }
                    <pointLight position={[0, 0, 0]}/>
                    <Planet color={"#E1DC59"} size={350} position={[0, 0, 0]} speed={0} texture={'/textures/sun.jpg'}/>

                    { /* Render the planets */ }
                    { /* Mercury */ }
                    <Planet color={"#B8B8B8"} size={2*sizeScalingFactor} position={[1*scalingFactor, 0, 0]} offset={Math.random() * Math.PI * 2}
                        xRadius={1*scalingFactor} zRadius={1*scalingFactor} speed={47.87} texture={'/textures/mercury.jpg'}/>
                    { /* Venus */ }
                    <Planet color={"#E1DC59"} size={2.3*sizeScalingFactor} position={[1.42*scalingFactor, 0, 0]} offset={Math.random() * Math.PI * 2}
                        xRadius={1.42*scalingFactor} zRadius={1.42*scalingFactor} speed={35.02} texture={'/textures/venus.jpg'}/>
                    { /* Earth */ }
                    <Planet color={"#2E8B57"} size={2.5*sizeScalingFactor} position={[1.8*scalingFactor, 0, 0]} offset={Math.random() * Math.PI * 2}
                        xRadius={1.8*scalingFactor} zRadius={1.8*scalingFactor} speed={29.78} texture={'/textures/earth.jpg'}/>
                    { /* Mars */ }
                    <Planet color={"#B22222"} size={2.3*sizeScalingFactor} position={[2.32*scalingFactor, 0, 0]} offset={Math.random() * Math.PI * 2}
                        xRadius={2.32*scalingFactor} zRadius={2.32*scalingFactor} speed={24.077} texture={'/textures/mars.jpg'}/>

                    {/*Asteroid Belt */}
                    {Array.from({ length: asteroidCount }, (_, i) => {
                        const angle = angleIncrement * i;
                        const x = semiMajorAxis * Math.cos(angle);
                        const y = semiMinorAxis * Math.sin(angle);
                        const randomness = Math.random() * 100 - 50; // adding a random value between -50 and 50
                        return (
                        <mesh 
                                key={i} 
                                position={[x + randomness, randomness/2, y + randomness]}
                                scale={[asteroidSize, asteroidSize, asteroidSize]}
                            >
                                <sphereGeometry args={[1, 32, 32]} />
                                <meshStandardMaterial color={asteroidColor} />
                            </mesh>
                        );
                    })}

                    { /* Jupiter */ }
                    <Planet color={"#F1C40F"} size={7.5*sizeScalingFactor} position={[5.2*scalingFactor, 0, 0]} offset={Math.random() * Math.PI * 2}
                        xRadius={5.2*scalingFactor} zRadius={5.2*scalingFactor} ring={true} ringRadius={12*sizeScalingFactor} ringTube={0.5*sizeScalingFactor} ringColor={'#F1C40F'} speed={13.07} texture={'/textures/jupiter.jpg'}/>
                    { /* Saturn */ }
                    <Planet color={"#F1C40F"} size={5.5*sizeScalingFactor} position={[9.5*scalingFactor, 0, 0]} offset={Math.random() * Math.PI * 2}
                        xRadius={9.5*scalingFactor} zRadius={9.5*scalingFactor} ring={true} ringRadius={10*sizeScalingFactor} ringTube={0.5*sizeScalingFactor} ringColor={'#F1C40F'} speed={9.69} texture={'/textures/saturn.jpg'}/>
                    { /* Uranus */ }
                    <Planet color={"#00BFFF"} size={4.5*sizeScalingFactor} position={[19*scalingFactor, 0, 0]} offset={Math.random() * Math.PI * 2}
                        xRadius={19*scalingFactor} zRadius={19*scalingFactor} ring={true} ringRadius={10*sizeScalingFactor} ringTube={0.5*sizeScalingFactor} ringColor={'#00BFFF'} speed={6.81} texture={'/textures/uranus.jpg'}/>
                    { /* Neptune */ }
                    <Planet color={"#F1C40F"} size={4.3*sizeScalingFactor} position={[20.07*scalingFactor, 0, 0]} offset={Math.random() * Math.PI * 2}
                        xRadius={20.07*scalingFactor} zRadius={20.07*scalingFactor} ring={true} ringRadius={10*sizeScalingFactor} ringTube={0.5*sizeScalingFactor} ringColor={'#F1C40F'} speed={5.43} texture={'/textures/neptune.jpg'}/>
                </Suspense>
            </Canvas>
        </div>
    )
}

export default SolarSystem;