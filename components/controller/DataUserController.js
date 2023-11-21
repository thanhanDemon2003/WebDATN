const datauserService = require("../service/Datauser.js")

const createDataUserController = async (res, req, next) => {
    try {
        const stt = req.body.stt;
        const token = req.body.token;
        const method = req.body.method;
        console.log(stt, token, method);
        if (!stt || !token || !method) {
            return res.status(400).json({ error: 1, notification: "Thiếu dữ liệu" });
        }
        const datauser = await datauserService.create(stt, token, method);
        if (!datauser) {
            return res.status(400).json({ error: 1, notification: "Tạo thất bại" });
        }
        return res.status(200).json({ success: true, notification: "Tạo thành công" });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: 2, notification: "Lỗi server" });
    }
}
const getDataUserController = async(res, req, next) => {
    try {
        const { stt } = req.body;
        if (!stt) {
            return res.status(400).json({ error: 1, notification: "Thiếu dữ liệu" });
        }
        const datauser = await datauserService.get(stt);
        if (!datauser) {
            return res.status(400).json({ error: 1, notification: "Không tìm thấy" });
        }
        return res.status(200).json({ datauser });
    } catch (error) {
        console.log(error);

        return res.status(500).json({ error: 2, notification: "Lỗi server" });
    }

}

module.exports = {
    createDataUserController,
    getDataUserController
}