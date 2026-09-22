import "./configView.css";

export const ConfigView = ({ config }) => {
  return (
    <div className="selected-config">{config && <pre>{JSON.stringify(config, null, 2)}</pre>}</div>
  );
};
