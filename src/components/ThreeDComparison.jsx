import React, { useRef, useState, Suspense } from 'react'; // Added Suspense
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Environment, ContactShadows, Html, useProgress } from '@react-three/drei';
import * as THREE from 'three';

// Loader Component
function Loader() {
    const { progress } = useProgress();
    return <Html center className="text-mirari-silver text-sm font-heading tracking-widest">{progress.toFixed(0)}% LOADED</Html>;
}

// Car Hood Geometry using Standard Physical Material
const CarHood = ({ cleanliness }) => {
    const mesh = useRef();

    // Cleanliness 0 = Rough, Dirty
    // Cleanliness 1 = Smooth, Mirror

    // Inverse logic for roughness: Dirty (0) -> High Roughness (0.4), Clean (1) -> Low Roughness (0.05)
    const targetRoughness = 0.4 - (cleanliness * 0.35);
    // Clearcoat roughness: Dirty (0) -> 0.5, Clean (1) -> 0
    const targetClearcoatRoughness = 0.4 - (cleanliness * 0.4); // Sharper reflections
    // Metalness: slightly higher when clean to pop reflections
    const targetMetalness = 0.6 + (cleanliness * 0.4); // More metallic

    useFrame((state, delta) => {
        if (mesh.current) {
            // Smooth interpolation for visual flair
            mesh.current.material.roughness = THREE.MathUtils.lerp(mesh.current.material.roughness, targetRoughness, delta * 2);
            mesh.current.material.clearcoatRoughness = THREE.MathUtils.lerp(mesh.current.material.clearcoatRoughness, targetClearcoatRoughness, delta * 2);
            mesh.current.material.metalness = THREE.MathUtils.lerp(mesh.current.material.metalness, targetMetalness, delta * 2);
        }
    });

    return (
        <mesh ref={mesh} rotation={[-Math.PI / 2 + 0.2, 0, 0]} receiveShadow castShadow>
            {/* Radius reduced from 3 to 2.2 for smaller size */}
            <sphereGeometry args={[2.2, 64, 64, 0, Math.PI * 2, 0, 1.2]} />
            <meshPhysicalMaterial
                color="#080808" // Deep black
                roughness={0.4}
                metalness={0.6}
                clearcoat={1}
                clearcoatRoughness={0.4}
                reflectivity={1}
                envMapIntensity={2.5} // Stronger reflections
            />
        </mesh>
    );
};

// Scene Setup
const Scene = ({ cleanliness }) => {
    return (
        <>
            {/* Camera moved back to ensure no clipping */}
            <PerspectiveCamera makeDefault position={[0, 2, 6]} fov={45} />

            <OrbitControls
                enableZoom={false}
                enablePan={false}
                minPolarAngle={Math.PI / 3} // Prevent looking too high/low
                maxPolarAngle={Math.PI / 2.2}
                autoRotate={false}
            />

            <Environment preset="warehouse" background={false} />

            {/* Strong lights */}
            <ambientLight intensity={0.5} />
            <spotLight position={[10, 10, 10]} angle={0.5} penumbra={1} intensity={10} castShadow />
            <pointLight position={[-10, 5, -10]} intensity={10} color="#4444ff" />

            {/* REFLECTION STRIPS - Creates the "Car Commercial" look */}
            {/* Top Strip */}
            <mesh position={[0, 4, 1]} rotation={[Math.PI / 2, 0, 0]}>
                <planeGeometry args={[8, 0.2]} />
                <meshBasicMaterial color="white" toneMapped={false} />
            </mesh>

            {/* Left Vertical Strip */}
            <mesh position={[-3, 2, 2]} rotation={[0, Math.PI / 4, 0]}>
                <planeGeometry args={[0.2, 4]} />
                <meshBasicMaterial color="white" toneMapped={false} />
            </mesh>

            {/* Right Vertical Strip */}
            <mesh position={[3, 2, 2]} rotation={[0, -Math.PI / 4, 0]}>
                <planeGeometry args={[0.2, 4]} />
                <meshBasicMaterial color="white" toneMapped={false} />
            </mesh>

            <CarHood cleanliness={cleanliness} />

            <ContactShadows position={[0, -1, 0]} opacity={0.6} scale={10} blur={2.5} far={4} color="#000000" />
        </>
    );
};

const ThreeDComparison = () => {
    const [cleanliness, setCleanliness] = useState(0.5); // 0 to 1

    return (
        <section className="relative w-full h-[80vh] bg-mirari-black flex flex-col items-center justify-center overflow-hidden">
            <div className="absolute top-12 z-20 text-center pointer-events-none">
                <h2 className="text-3xl md:text-4xl font-heading font-bold text-white mb-2">THE MIRARI EFFECT</h2>
                <p className="text-mirari-silver text-sm tracking-widest uppercase">Drag slider to reveal perfection</p>
            </div>

            <div className="w-full h-full absolute inset-0 text-white cursor-move">
                <Canvas shadows dpr={[1, 2]}>
                    <Suspense fallback={<Loader />}>
                        <Scene cleanliness={cleanliness} />
                    </Suspense>
                </Canvas>
            </div>

            {/* Slider Control */}
            <div className="absolute bottom-12 left-1/2 -translate-x-1/2 w-4/5 md:w-1/3 z-20 flex flex-col items-center gap-4">
                <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.01"
                    value={cleanliness}
                    onChange={(e) => setCleanliness(parseFloat(e.target.value))}
                    className="w-full h-2 bg-gray-600 rounded-lg appearance-none cursor-pointer accent-white hover:accent-mirari-silver transition-all"
                />
                <div className="flex justify-between w-full text-xs text-mirari-silver font-heading tracking-widest uppercase opacity-70">
                    <span>DIRTY / SWIRLS</span>
                    <span>IMMACULATE</span>
                </div>
            </div>
        </section>
    );
};

export default ThreeDComparison;
