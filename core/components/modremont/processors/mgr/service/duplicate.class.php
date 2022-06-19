<?php

class modRemontServiceDuplicateProcessor extends modObjectDuplicateProcessor
{
    public $objectType = 'modRemontService';
    public $classKey = 'modRemontService';
    public $languageTopics = ['modremont'];
    public $nameField = 'pagetitle';


    public function beforeSave()
    {

        $this->newObject->set('active',(int)$this->getProperty('active'));
        $this->newObject->set('uri',$this->getProperty('uri'));
        return parent::beforeSave();
    }

}

return 'modRemontServiceDuplicateProcessor';