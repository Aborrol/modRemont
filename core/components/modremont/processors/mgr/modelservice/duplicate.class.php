<?php

class modRemontModelServiceDuplicateProcessor extends modObjectDuplicateProcessor
{
    public $objectType = 'modRemontModelService';
    public $classKey = 'modRemontModelService';
    public $languageTopics = ['modremont'];
    public $nameField = 'pagetitle';

    public function beforeSave()
    {
        $this->newObject->set('active',(int)$this->getProperty('active'));
        $this->newObject->set('uri',$this->getProperty('uri'));

        return parent::beforeSave();
    }


}

return 'modRemontModelServiceDuplicateProcessor';