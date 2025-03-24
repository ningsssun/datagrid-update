export default class CarModel {
    constructor({
      _id,
      Brand,
      Model,
      TopSpeed_KmH,
      Range_Km,
      PowerTrain,
      PlugType,
      BodyStyle,
      Segment,
      Seats,
      PriceEuro,
    }) {
      this._id = _id;
      this.Brand = Brand;
      this.Model = Model;
      this.TopSpeed_KmH = TopSpeed_KmH;
      this.Range_Km = Range_Km;
      this.PowerTrain = PowerTrain;
      this.PlugType = PlugType;
      this.BodyStyle = BodyStyle;
      this.Segment = Segment;
      this.Seats = Seats;
      this.PriceEuro = PriceEuro;
    }
  }
  