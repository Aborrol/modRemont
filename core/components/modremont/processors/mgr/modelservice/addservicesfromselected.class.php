<?php

class modRemontModelServiceFromSelectedProcessor extends modObjectProcessor
{
    public $objectType = 'modRemontModelService';
    public $classKey = 'modRemontModelService';
    public $languageTopics = ['modremont'];
 
    /**
     * @return array|string
     */
    public function process()
    {
        if (!$this->checkPermissions()) {
            return $this->failure($this->modx->lexicon('access_denied'));
        }

        $ids = $this->modx->fromJSON($this->getProperty('ids'));
        $model_id = (int)$this->getProperty('model_id');
        if (empty($ids)) {
            return $this->failure($this->modx->lexicon('modremont_item_err_ns'));
        }
        if (empty($model_id)) {
            return $this->failure($this->modx->lexicon('modremont_item_err_ns'));
        }
        foreach ($ids as $id) {
            if (!$object = $this->modx->getObject('modRemontService', $id)) {
                return $this->failure($this->modx->lexicon('modremont_service_err_nf'));
            }
            $service = $object->toArray();
            $service = array_diff_key($service, ['id' => NULL, 'category_id' => NULL, 'action' => NULL]);
            $service['model_id'] = $model_id;
            $new = $this->modx->newObject('modRemontModelService',$service);
            if ($new->save() == false) {
                $this->modx->log(MODX_LOG_LEVEL_ERROR, 'modRemontModelServiceFromSelectedProcessor error save');
             }
        }
        return $this->success();
    }
}

return 'modRemontModelServiceFromSelectedProcessor';
