<?php

class modRemontModelDuplicateProcessor extends modObjectDuplicateProcessor
{
    public $objectType = 'modRemontModel';
    public $classKey = 'modRemontModel';
    public $languageTopics = ['modremont'];
    public $nameField = 'pagetitle';

    public function beforeSave()
    {
        $this->newObject->set('active',(int)$this->getProperty('active'));
        $this->newObject->set('uri',$this->getProperty('uri'));
        return parent::beforeSave();
    }


    /**
     *
     */
    public function afterSave() {
            $this->duplicateServices();
            return true;
    }



    public function duplicateServices()
    {
        $oldid = $this->object->get('id');
            $services = $this->modx->getCollection('modRemontModelService', ['model_id' => $oldid]);
            if(is_array($services) && !empty($services)) {
                foreach($services as $service) {
                    $newService = $this->modx->newObject('modRemontModelService');
                    $newService->fromArray($service->toArray());
                    $newService->set('model_id',$this->newObject->get('id'));
                    $newService->save();
                }
            }
    }
  

}

return 'modRemontModelDuplicateProcessor';