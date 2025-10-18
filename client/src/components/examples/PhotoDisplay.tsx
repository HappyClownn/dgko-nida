import PhotoDisplay from '../PhotoDisplay';

export default function PhotoDisplayExample() {
  return (
    <div className="p-8 bg-background min-h-screen">
      <PhotoDisplay
        imageUrl="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800"
        currentZoomLevel={2}
        maxZoomLevel={5}
        points={[1000, 750, 500, 250, 100]}
      />
    </div>
  );
}
