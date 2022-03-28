const {
    category
} = require("../model");

module.exports = {
    async tampil(req, res, next) {
        try {
            await category.findAll().then(result => {
                if (result.length > 0) {
                    return res.status(200).json({
                        success: 1,
                        data: result
                    });
                } else {
                    return res.status(400).json({
                        success: 0,
                        message: "tidak ditemukan...",
                    });
                }
            }).catch(error => {
                return res.status(400).json({
                    success: 0,
                    message: error.message
                });
            });
        } catch (error) {
            return res.status(400).json({
                success: 0,
                message: error.message
            });
        }
    },
    async cari(req, res, next) {
        try {
            await category.findOne({
                where: {
                    id_category: req.params.id_category,
                }
            }).then(result => {
                if (result != null) {
                    return res.status(200).json({
                        success: 1,
                        data: result
                    });
                } else {
                    return res.status(400).json({
                        success: 0,
                        message: "tidak ditemukan...",
                    });
                }
            }).catch(error => {
                return res.status(400).json({
                    success: 0,
                    message: error.message
                });
            });
        } catch (error) {
            return res.status(400).json({
                success: 0,
                message: error.message
            });
        }
    },
    async simpan(req, res, next) {
        try {
            const {
                name,
                description,
                status
            } = req.body;
            await category.create({
                name,
                description,
                status
            }).then(result => {
                return res.status(201).json({
                    success: 1,
                    message: 'Berhasil Tersimpan',
                    data: result,
                });
            }).catch(error => {
                return res.status(400).json({
                    success: 0,
                    message: error.message
                });
            });
        } catch (error) {
            return res.status(400).json({
                success: 0,
                message: error.message
            })
        }
    },
    async edit(req, res, next) {
        try {
            const {
                name,
                description,
                status 
            } = req.body;
            await category.update({
                name,
                description,
                status
            }, {
                where: {
                    id_category: req.params.id_category
                }
            }).then(result => {
                if (result == 1) {
                    return res.status(201).json({
                        success: 1,
                        message: 'Telah diperbarui',
                    })
                } else {
                    return res.status(400).json({
                        success: 0,
                        message: 'Tidak ada perbaruan data',
                    })
                }
            }).catch(error => {
                return res.status(400).json({
                    success: 0,
                    message: error.message
                });
            });
        } catch (error) {
            return res.status(400).json({
                success: 0,
                message: error.message
            })
        }
    },
    async hapus(req, res, next) {
        try {
            await category.destroy({
                where: {
                    id_category: req.params.id_category
                }
            });
            return res.status(200).json({
                success: 1,
                message: "Data Telah dihapus",
            });
        } catch (error) {
            return res.status(400).json({
                success: 0,
                message: error.message
            });
        }
    }
}