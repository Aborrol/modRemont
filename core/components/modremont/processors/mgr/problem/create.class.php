<?php

class modRemontProblemCreateProcessor extends modObjectCreateProcessor
{
    public $objectType = 'modRemontProblem';
    public $classKey = 'modRemontProblem';
    public $languageTopics = ['modremont'];
    //public $permission = 'create';


    /**
     * @return bool
     */
    public function beforeSet()
    {

        $name = trim($this->getProperty('pagetitle'));
        $uri = trim($this->getProperty('uri'));


        if (empty($uri)) {
            $this->modx->error->addField('uri', $this->modx->lexicon('modremont_problem_err_uri'));
        } elseif ($this->modx->getCount($this->classKey, ['uri' => $uri])) {
            $this->modx->error->addField('uri', $this->modx->lexicon('modremont_problem_err_uriexist'));
        }
        if (empty($name)) {
            $this->modx->error->addField('pagetitle', $this->modx->lexicon('modremont_problem_err_name'));
        } elseif ($this->modx->getCount($this->classKey, ['pagetitle' => $name])) {
            $this->modx->error->addField('pagetitle', $this->modx->lexicon('modremont_problem_err_ae'));
        }

        return parent::beforeSet();
    }

}

return 'modRemontProblemCreateProcessor';