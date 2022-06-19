<?php

class modRemontModelServiceFromCategoryProcessor extends modObjectProcessor
{
    public $objectType = 'modRemontModelService';
    public $classKey = 'modRemontModelService';
    public $languageTopics = ['modremont'];
    //public $permission = 'save';


    /**
     * @return array|string
     */
    public function process()
    {
        if (!$this->checkPermissions()) {
            return $this->failure($this->modx->lexicon('access_denied'));
        }

        $model_id = (int)$this->getProperty('model_id');
        $category_id = (int)$this->getProperty('category_id');

        if (empty($model_id)) {
            return $this->failure($this->modx->lexicon('modremont_item_err_ns').'model_id');
        }
        if (empty($category_id)) {
            return $this->failure($this->modx->lexicon('modremont_item_err_ns').'category_id');
        }
       
        if (!$ids = $this->modx->getCollection('modRemontService', ["FIND_IN_SET('\"{$category_id}\"', REPLACE(REPLACE(categories, '[', ''),']','')) > 0"])) {
            return $this->failure($this->modx->lexicon('modremont_service_err_nf'));
        }
        foreach ($ids as $id) {
            $service = $id->toArray();
            $service = array_diff_key($service, ['id' => NULL, 'category_id' => NULL, 'action' => NULL]);
            $service['model_id'] = $model_id;
            $new = $this->modx->newObject('modRemontModelService',$service);
            if ($new->save() == false) {
                $this->modx->log(MODX_LOG_LEVEL_ERROR, 'modRemontModelServiceFromCategory error save');
             }
        }

        return $this->success();
    }

}

return 'modRemontModelServiceFromCategoryProcessor';
