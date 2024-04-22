<?php

namespace rest;
use builder\DatabaseBuilder;
use database\CustomPDO;

class MetaDataHandler extends RestParent
{


    public function getCompanyMeta() {
        $categories = [];
        $temp = $this->dbConnection->simpleFetchTable('company_categories');
        foreach ($temp as $category)
            $categories[$category['id']] =$category['name'];
       $this->result = $categories;
   }

}
