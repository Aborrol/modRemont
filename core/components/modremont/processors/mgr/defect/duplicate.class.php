<?php

class modRemontDefectDuplicateProcessor extends modObjectDuplicateProcessor
{
    public $objectType = 'modRemontDefect';
    public $classKey = 'modRemontDefect';
    public $languageTopics = ['modremont'];
    public $nameField = 'pagetitle';

    public function beforeSave()
    {
        $this->newObject->set('active',(int)$this->getProperty('active'));
        $this->newObject->set('uri',$this->getProperty('uri'));
        return parent::beforeSave();
    }
}

return 'modRemontDefectDuplicateProcessor';