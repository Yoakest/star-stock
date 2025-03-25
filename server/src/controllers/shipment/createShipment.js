async function createShipment(shipment) {
    console.log(shipment);
    const { Shipment, Product, Pallet } = require('../../models/indexModel');

    // En büyük pallet_no'yu al, yoksa 10 olarak başlat
    const lastPallet = await Pallet.findOne({
        order: [['pallet_no', 'DESC']]
    });

    console.log("last pallet")
    console.log(lastPallet)
    var palletNo = lastPallet ? parseInt(lastPallet.dataValues.pallet_no) + 1 : 10000;

    const newShipment = await Shipment.create(shipment);

    for (const pallet of shipment.pallet_list) {
        console.log("palletNo: ", palletNo);
        console.log("pallet", pallet);

        const newPallet = {
            pallet_no: palletNo,
            quantity: pallet.quantity,
            warehouse: "Pharmastar",
            productId: pallet.id
        };

        await Pallet.create(newPallet);
        console.log(newPallet);
        palletNo++; // Her yeni palet için bir artır
    }

    return newShipment;
}

module.exports = createShipment;
