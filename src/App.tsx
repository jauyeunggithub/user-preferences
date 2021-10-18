import { useMemo, useState } from "react";
import { v4 as uuidv4 } from "uuid";

interface Feature {
  title: string;
  id: string;
  price?: number;
  subFeatures?: Feature[];
}

interface FeatureProps {
  features: Feature[] | undefined;
  setSelectedFeatures: (
    value: Feature[] | ((prevVar: Feature[]) => Feature[])
  ) => void;
  selectedFeatures: Feature[];
}

interface ShowItemStates {
  [key: string | number]: boolean;
}

const data: Feature[] = [
  {
    title: "Feature A",
    id: uuidv4(),
    subFeatures: [
      {
        title: "Sub-feature A-1",
        id: uuidv4(),
        price: 0,
      },
      {
        title: "Sub-feature A-2",
        id: uuidv4(),
        price: 0,
        subFeatures: [
          {
            title: "Sub-feature A-2-1",
            id: uuidv4(),
            price: 50,
          },
          {
            title: "Sub-feature A-2-2",
            id: uuidv4(),
            price: 50,
          },
        ],
      },
      {
        title: "Sub-feature A-3",
        id: uuidv4(),
        price: 0,
      },
    ],
  },
  {
    title: "Feature B",
    id: uuidv4(),
  },
  {
    title: "Feature C",
    id: uuidv4(),
  },
];

const FeaturesList = ({
  features,
  setSelectedFeatures,
  selectedFeatures,
}: FeatureProps) => {
  const [show, setShow] = useState<ShowItemStates>({});

  return Array.isArray(features) ? (
    <div style={{ cursor: "pointer" }}>
      {features.map((f) => {
        const { id, title, price, subFeatures } = f;

        const isSelected = Boolean(selectedFeatures.find((f) => f.id === id));

        return (
          <div key={id} style={{ paddingLeft: "10px" }}>
            <p
              onClick={() =>
                setShow((show: ShowItemStates) => ({
                  ...show,
                  [id]: !show[id],
                }))
              }
            >
              <input
                type="checkbox"
                checked={isSelected}
                onClick={(e) => {
                  e.stopPropagation();
                }}
                onChange={() => {
                  setSelectedFeatures((selectedFeatures) => {
                    if (isSelected) {
                      return selectedFeatures.filter((f) => f.id !== id);
                    } else {
                      return [...selectedFeatures, f];
                    }
                  });
                }}
              />
              {title} {price && `$${price}`}
              {Array.isArray(subFeatures) && (show[id] ? "(-)" : "(+)")}
            </p>
            {show[id] && (
              <FeaturesList
                features={subFeatures}
                setSelectedFeatures={setSelectedFeatures}
                selectedFeatures={selectedFeatures}
              />
            )}
          </div>
        );
      })}
    </div>
  ) : (
    <div />
  );
};

export default function App() {
  const [selectedFeatures, setSelectedFeatures] = useState<Feature[]>([]);

  const total = useMemo(() => {
    return selectedFeatures
      .map((f) => f.price)
      .reduce((a, b) => {
        return (a ?? 0) + (b ?? 0);
      }, 0);
  }, [selectedFeatures]);

  return (
    <div className="App">
      <FeaturesList
        features={data}
        setSelectedFeatures={setSelectedFeatures}
        selectedFeatures={selectedFeatures}
      />
      <div>
        <div>Total: ${total} / mo </div>
        <button>Save</button>
      </div>
    </div>
  );
}
