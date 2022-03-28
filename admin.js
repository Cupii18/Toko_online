const {
    admin
} = require("../model");

module.exports = {
    async tampil(req, res, next) {
        try {
            await admin.findAll().then(result => {
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
            await admin.findOne({
                where: {
                    id_admin: req.params.id_admin,
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
                Name,
                id_province,
                id_regency,
                id_district,
                id_village,
                address,
                postcode,
                telp,
                email,
                verification_code,
                password,
                token,
                ex_token,
                roles
            } = req.body;
            await admin.create({
                Name,
                id_province,
                id_regency,
                id_district,
                id_village,
                address,
                postcode,
                telp,
                email,
                verification_code,
                password,
                token,
                ex_token,
                roles
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
                Name,
                id_province,
                id_regency,
                id_district,
                id_village,
                address,
                postcode,
                telp,
                email,
                verification_code,
                password,
                token,
                ex_token,
                roles
            } = req.body;
            await admin.update({
                Name,
                id_province,
                id_regency,
                id_district,
                id_village,
                address,
                postcode,
                telp,
                email,
                verification_code,
                password,
                token,
                ex_token,
                roles
            }, {
                where: {
                    id_admin: req.params.id_admin
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
            await admin.destroy({
                where: {
                    id_admin: req.params.id_admin
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