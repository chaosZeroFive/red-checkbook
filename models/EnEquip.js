const mongoose = require("mongoose");

const EnEquipSchema = mongoose.Schema({
  enemy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "enemies"
  }
  pers_officer: {
    type: Number
  },
  pers_nco: {
    type: Number
  },
  pers_enlisted: {
    type: Number
  },
  pistol_pm: {
    type: Number
  },
  rifle_ak74m: {
    type: Number
  },
  carbine_aks74u: {
    type: Number
  },
  mg_pkm: {
    type: Number
  },
  rifle_svd: {
    type: Number
  },
  hmg_nsv: {
    type: Number
  },
  agl_w87: {
    type: Number
  },
  gl_gp30: {
    type: Number
  },
  atgm_eryx: {
    type: Number
  },
  atgl_rpg29: {
    type: Number
  },
  atgl_pf3t600: {
    type: Number
  },
  atdl_armbrust: {
    type: Number
  },
  fw_rpo_a: {
    type: Number
  },
  mine_ap: {
    type: Number
  },
  mine_at: {
    type: Number
  },
  vehicle_utility: {
    type: Number
  },
  trailer_utility: {
    type: Number
  },
  vehicle_technical: {
    type: Number
  },
  smoke_hand: {
    type: Number
  },
  bino_lrf: {
    type: Number
  },
  gps: {
    type: Number
  },
  thermal_sophie: {
    type: Number
  },
  nvg: {
    type: Number
  },
  nvg_driver: {
    type: Number
  },
  nvg_ak_gp30: {
    type: Number
  },
  radio_vlp: {
    type: Number
  },
  radio_lp: {
    type: Number
  },
  radio_mp: {
    type: Number
  },
  radio_hp: {
    type: Number
  },
  radio_vhp: {
    type: Number
  },
  created: {
    type: Date,
    default: Date.now
  }
  modified: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("enemy-equip", EnEquipSchema);
