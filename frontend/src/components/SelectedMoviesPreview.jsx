import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { FaTrash } from "react-icons/fa";

const SelectedMoviesPreview = ({
  selectedMovies,
  onRemove,
  setSelectedMovies,
}) => {
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    })
  );

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (active.id !== over.id) {
      const oldIndex = selectedMovies.findIndex((m) => m.id === active.id);
      const newIndex = selectedMovies.findIndex((m) => m.id === over.id);
      setSelectedMovies((movies) => arrayMove(movies, oldIndex, newIndex));
    }
  };

  return (
    <div
      className="mt-4 max-h-[800px] overflow-y-auto pr-2 bg-zinc-900 text-white p-8 font-bebas-neue  [&::-webkit-scrollbar]:w-2
  [&::-webkit-scrollbar-track]:bg-gray-100
  [&::-webkit-scrollbar-thumb]:bg-gray-300
  dark:[&::-webkit-scrollbar-track]:bg-neutral-700
  dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500"
    >
      <h1 className="text-4xl">Create Your List</h1>

      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={selectedMovies.map((movie) => movie.id)}
          strategy={verticalListSortingStrategy}
        >
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-3 overflow-hidden">
            {selectedMovies.map((movie) => (
              <SortableMovieCard
                key={movie.id}
                movie={movie}
                removeMovie={onRemove}
              />
            ))}
          </div>
        </SortableContext>
      </DndContext>
    </div>
  );
};

const SortableMovieCard = ({ movie, removeMovie }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: movie.id });

  const style = {
    transform: CSS.Translate.toString({
      x: transform?.x ?? 0,
      y: transform?.y ?? 0,
    }),
    transition,
    opacity: isDragging ? 0.5 : 1,
    touchAction: "none",
    maxWidth: "100%",
    maxHeight: "100%",
    overflow: "hidden",
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="relative flex flex-col items-center justify-start w-full p-2 group cursor-grab active:cursor-grabbing transition-transform duration-50 ease-in-out hover:-translate-y-1 hover:scale-105"
    >
      {/* Movie Poster */}
      <div className="relative">
        <img
          src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
          alt={movie.title}
          className="w-full h-48 object-cover rounded-lg shadow-lg transition-all duration-200"
        />

        {/* Remove Button */}
        <button
          onClick={() => removeMovie(movie.id)}
          className="absolute top-2 right-2 bg-red-600 hover:bg-red-700 text-white rounded-full p-1.5 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 shadow-md"
        >
          <FaTrash size={12} />
        </button>
      </div>

      {/* Movie Title */}
      <p className="text-center mt-2 text-sm">{movie.title}</p>
    </div>
  );
};

export default SelectedMoviesPreview;
