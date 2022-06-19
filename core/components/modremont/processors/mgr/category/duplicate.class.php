<?php

class modRemontCategoryDuplicateProcessor extends modObjectDuplicateProcessor
{
    public $objectType = 'modRemontCategory';
    public $classKey = 'modRemontCategory';
    public $languageTopics = ['modremont'];
    public $nameField = 'pagetitle';


    public function beforeSave()
    {
        $this->newObject->set('uri',$this->getProperty('uri'));
        $this->newObject->set('active',(int)$this->getProperty('active'));
        return parent::beforeSave();
    }

}

return 'modRemontCategoryDuplicateProcessor';