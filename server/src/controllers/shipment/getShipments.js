const { Shipment, Pallet, Product } = require("../../models/indexModel");

async function getShipments() {
    try {
        const shipments = await Shipment.findAll();

        // Sevkiyatları güncellemek için promise.all kullanacağız
        await Promise.all(shipments.map(async (shipment) => {
            // Palet listesini güncelle
            await Promise.all(shipment.dataValues.pallet_list.map(async (pallet) => {
                // Palet ID'si ile ürün bilgilerini al
                const productInfos = await Product.findByPk(pallet.id, {
                    attributes: ["product_name", "product_code"]
                });

                // Ürün bilgilerini palete ekle
                pallet.product_name = productInfos.dataValues.product_name;
                pallet.product_code = productInfos.dataValues.product_code;

                console.log("pallet")
                console.log(pallet)

            }));

        }));

        console.log("updatedShipments")
        console.log(shipments)

        return shipments;


        // Eğer JSON yanıtı olarak döndüreceksen:

    } catch (error) {
        console.error("Sevkiyatları alırken hata oluştu:", error);
    }
}

module.exports = getShipments;
