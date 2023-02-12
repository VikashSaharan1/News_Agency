const { institutionsDB, globalMastersDB } = require("../../models");
const Institution_contact = institutionsDB.institution_contact;
const Institution_profile = institutionsDB.institution_profile;
const Institution_medium = institutionsDB.institution_medium;
const Institution_boards = institutionsDB.boards;
const City = globalMastersDB.city;
const Medium = globalMastersDB.medium;
const Op = institutionsDB.Sequelize.Op;
const Sequelize = require("sequelize");


  
// Retrieve all Cities from the database.
exports.findAll = async (req, res) => {
  try {
  
       boards = await globalMastersDB.sequelize.query("select b.id, b.name from `waytoedu_global_masters`. `boards` as b ", { type: Sequelize.QueryTypes.SELECT })
       med = await globalMastersDB.sequelize.query("select m.id, m.name from `waytoedu_global_masters`. `mediums` as m ", { type: Sequelize.QueryTypes.SELECT })
     // ;
      //console.log(boards);
      //arr.push
      /*await institutionsDB.sequelize.query('select ic.name, ic.website, ic.approx_fees, ip.est_year, ip.noofstudents, ip.noofteachers, ip.age_group, ip.school_areas,' 
      + ' ip.short_desc, ip.long_desc, c.name as city, s.name as state, cs.name as country '
      + ' from `institution-contacts` as ic ' 
      + ' Left JOIN `institution-profiles` ip on ic.id = ip.inst_id'
    //  + ' Left JOIN `institution_boards` ib on ic.id = ib.inst_id' 
      + ' Left JOIN `waytoedu_global_masters`. `cities` c on ic.city_id = c.id' 
      + ' Left JOIN `waytoedu_global_masters`. `states` s on ic.state_id = s.id'
      + ' Left JOIN `waytoedu_global_masters`. `countries` cs on ic.country_id = cs.id'
      //+ ' Left JOIN `waytoedu_global_masters`. `boards` b on b.id =  ib.board_id'
      + ' WHERE ic.is_active = 1 ', { type: Sequelize.QueryTypes.SELECT }
      ) */
      Institution_contact.findAll({
        attributes: ['name', 'website', 'approx_fees'],
        where: {is_active: 1},
          include: [{
            model: Institution_profile,
            as: 'institution_profile',
            attributes: ['est_year', 'noofstudents', 'noofteachers', 'age_group', 'school_areas', 'short_desc', 'long_desc' ]
            
          },
          {
            model: Institution_medium,
            as: 'institution_medium',            
            attributes: ['medium_id']
                 
          }
        
        ]
      })
      
      .then((institution) => {
        //const insitIds = institution

      //return res.status(200).json([institution,boards])
      return res.status(200).json([institution, boards, med])
    
      });
      // await Institution_contact.findOne({ 
      //   where: { is_active: 1 }, 
      //   include: [
      //     {
      //       model: City,
      //       as: 'cities',
      //       on: {
      //         // this is where magic happens
      //         city_id: Sequelize.literal("`institution-contacts`.`city_id` = `waytoedu_global_masters`.`cities`.`id`") 
      //       }
      //     }
      //     ] 
      // }).then(data => {
      //   res.send(data);
      // });
      
   
   } catch(err) {
     console.log(err);
     return res.status(500).json({'error': 'internal server error'})
   
   }
};

// Find a single City with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Institution_contact.findByPk(id)
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find City with id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving City with id=" + id
      });
    });
};






