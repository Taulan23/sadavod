import RoundBox from "./RoundBox";

const SortBy = () => {
  return (
    <div className="items">
      <div className="item">
        <RoundBox of="default" />
        <span className="text">Default</span>
      </div>
      <div className="item">
        <RoundBox of="price_high_to_low" />
        <span className="text">Цена: От высокой к низкой</span>
      </div>
      <div className="item">
        <RoundBox of="price_low_to_high" />
        <span className="text">Цена: От низкой к высокой</span>
      </div>
    </div>
  );
};

export default SortBy;
